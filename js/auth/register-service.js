import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { auth, db } from '../config/service-firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loading = document.getElementById('loading');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nama = document.getElementById('regNama').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const nip = document.getElementById('regNip').value.trim();
      const namaSekolah = document.getElementById('regSekolah').value.trim();
      const npsn = document.getElementById('regNpsn').value.trim();
      const namaKepsek = document.getElementById('regNamaKepsek').value.trim();
      const nipKepsek = document.getElementById('regNipKepsek').value.trim();
      const jabatan = document.getElementById('regJabatan').value;
      const password = document.getElementById('regPassword').value;

      if (loading) loading.classList.add('active');

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // 1. Simpan Data Sekolah (Merge)
        await setDoc(doc(db, 'schools', npsn), {
          npsn: npsn,
          nama_sekolah: namaSekolah,
          nama_kepsek: namaKepsek,
          nip_kepsek: nipKepsek
        }, { merge: true });

        // 2. Simpan Referensi di Root (PENTING: Agar login cepat tanpa collectionGroup)
        await setDoc(doc(db, 'users', uid), {
          uid: uid,
          email: email,
          role: jabatan, // Simpan role di root untuk pengecekan cepat
          school_id: npsn, // Simpan school_id untuk routing
          nama: nama
        });

        // 3. Simpan Data Lengkap di Nested Collection
        await setDoc(doc(db, 'schools', npsn, 'users', uid), {
          uid: uid,
          email: email,
          nama: nama,
          nip: nip,
          npsn: npsn,
          nama_sekolah: namaSekolah,
          nama_kepsek: namaKepsek,
          nip_kepsek: nipKepsek,
          jabatan: jabatan,
          approval_status: 'pending',
          tanggal_daftar: new Date().toISOString()
        });

        alert('Registrasi berhasil! Akun Anda sedang menunggu persetujuan Super Admin.');
        window.location.href = 'index.html';
      } catch (error) {
        console.error('Register Error:', error);
        let msg = 'Terjadi kesalahan saat registrasi.';
        if (error.code === 'auth/email-already-in-use') msg = 'Email sudah terdaftar.';
        if (error.code === 'auth/weak-password') msg = 'Password minimal 6 karakter.';
        alert(msg);
      } finally {
        if (loading) loading.classList.remove('active');
      }
    });
  }
});
