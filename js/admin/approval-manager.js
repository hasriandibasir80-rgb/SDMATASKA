import { collectionGroup, query, where, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { db } from '../config/service-firebase.js';

export class ApprovalManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (this.container) this.loadPendingUsers();
    }

    async loadPendingUsers() {
        this.container.innerHTML = '<p>Memuat data...</p>';
        try {
            const q = query(
                collectionGroup(db, 'users'),
                where('approval_status', '==', 'pending')
            );
            const snapshot = await getDocs(q);
            
            if (snapshot.empty) {
                this.container.innerHTML = '<p>Tidak ada user menunggu approval.</p>';
                return;
            }

            let html = '<div class="approval-list">';
            snapshot.forEach(docSnap => {
                const data = docSnap.data();
                const pathParts = docSnap.ref.path.split('/');
                const npsn = pathParts[1]; 
                const uid = pathParts[3];

                html += `
                    <div class="approval-card" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 8px;">
                        <h4>${data.nama} (${data.jabatan})</h4>
                        <p>Email: ${data.email} | NIP: ${data.nip}</p>
                        <p>Sekolah: ${data.nama_sekolah} (NPSN: ${npsn})</p>
                        <button class="btn-approve" data-npsn="${npsn}" data-uid="${uid}" style="background: green; color: white; padding: 5px 10px; margin-right: 5px;">Approve</button>
                        <button class="btn-reject" data-npsn="${npsn}" data-uid="${uid}" style="background: red; color: white; padding: 5px 10px;">Reject</button>
                    </div>
                `;
            });
            html += '</div>';
            this.container.innerHTML = html;

            document.querySelectorAll('.btn-approve').forEach(btn => {
                btn.addEventListener('click', (e) => this.updateStatus(e.target.dataset.npsn, e.target.dataset.uid, 'approved'));
            });
            document.querySelectorAll('.btn-reject').forEach(btn => {
                btn.addEventListener('click', (e) => this.updateStatus(e.target.dataset.npsn, e.target.dataset.uid, 'rejected'));
            });

        } catch (error) {
            console.error(error);
            this.container.innerHTML = '<p>Gagal memuat data. Pastikan index Firestore sudah dibuat.</p>';
        }
    }

    async updateStatus(npsn, uid, status) {
        try {
            await updateDoc(doc(db, 'schools', npsn, 'data', 'users', uid), {
                approval_status: status,
                tanggal_approval: new Date().toISOString()
            });
            alert(`User berhasil di-${status}`);
            this.loadPendingUsers();
        } catch (error) {
            console.error(error);
            alert('Gagal mengupdate status.');
        }
    }
}
