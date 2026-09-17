import { collection, query, where, getDocs, updateDoc, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { db } from '../config/service-firebase.js';

export class ApprovalManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (this.container) this.loadPendingUsers();
    }

    async loadPendingUsers() {
        this.container.innerHTML = '<p>Memuat data...</p>';
        try {
            // Ambil semua dokumen sekolah
            const schoolsSnapshot = await getDocs(collection(db, 'schools'));
            
            if (schoolsSnapshot.empty) {
                this.container.innerHTML = '<p>Tidak ada data sekolah.</p>';
                return;
            }

            let allPendingUsers = [];

            // Query user pending dari setiap sekolah
            for (const schoolDoc of schoolsSnapshot.docs) {
                const npsn = schoolDoc.id;
                const schoolData = schoolDoc.data();
                
                const usersQuery = query(
                    collection(db, 'schools', npsn, 'users'),
                    where('approval_status', '==', 'pending')
                );
                
                const usersSnapshot = await getDocs(usersQuery);
                
                usersSnapshot.forEach(userDoc => {
                    const userData = userDoc.data();
                    allPendingUsers.push({
                        uid: userDoc.id,
                        npsn: npsn,
                        ...userData
                    });
                });
            }
            
            if (allPendingUsers.length === 0) {
                this.container.innerHTML = '<p>Tidak ada user menunggu approval.</p>';
                return;
            }

            let html = '<div class="approval-list">';
            allPendingUsers.forEach(user => {
                html += `
                    <div class="approval-card" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 8px;">
                        <h4>${user.nama} (${user.jabatan})</h4>
                        <p>Email: ${user.email} | NIP: ${user.nip}</p>
                        <p>Sekolah: ${user.nama_sekolah} (NPSN: ${user.npsn})</p>
                        <button class="btn-approve" data-npsn="${user.npsn}" data-uid="${user.uid}" style="background: green; color: white; padding: 5px 10px; margin-right: 5px;">Approve</button>
                        <button class="btn-reject" data-npsn="${user.npsn}" data-uid="${user.uid}" style="background: red; color: white; padding: 5px 10px;">Reject</button>
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
            this.container.innerHTML = '<p>Gagal memuat data. Periksa console untuk detail error.</p>';
        }
    }

    async updateStatus(npsn, uid, status) {
        try {
            await updateDoc(doc(db, 'schools', npsn, 'users', uid), {
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
