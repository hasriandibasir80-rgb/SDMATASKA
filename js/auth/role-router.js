import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { db } from '../config/service-firebase.js';
import { AppConfig } from '../config/app-config.js';

export class RoleRouter {
  constructor() {
    this.routes = {
      [AppConfig.ROLES.SUPER_ADMIN]: 'dashboard-admin.html',
      [AppConfig.ROLES.KEPALA_SEKOLAH]: 'dashboard-kepsek.html',
      [AppConfig.ROLES.STAF_TU]: 'dashboard-tu.html',
      [AppConfig.ROLES.WALI_KELAS]: 'dashboard-wali-kelas.html',
      [AppConfig.ROLES.GURU_MAPEL]: 'dashboard-guru.html',
      [AppConfig.ROLES.SISWA]: 'dashboard-siswa.html',
      [AppConfig.ROLES.ORANG_TUA]: 'dashboard-ortu.html'
    };
  }

  async redirectByRole(uid) {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        alert('Akun tidak ditemukan di database. Hubungi Admin.');
        window.location.href = 'index.html';
        return;
      }

      const userData = userDocSnap.data();
      const role = userData.role;

      const targetPage = this.routes[role];

      if (targetPage) {
        // Simpan data user ke sessionStorage untuk auto-fill profil cepat
        sessionStorage.setItem('currentUser', JSON.stringify({
          uid: uid,
          role: role,
          nama: userData.nama,
          nip: userData.nip || '',
          kelas_id: userData.kelas_id || '',
          mapel_diajar: userData.mapel_diajar || []
        }));
        
        window.location.href = targetPage;
      } else {
        alert('Role tidak dikenali. Hubungi Admin.');
        window.location.href = 'index.html';
      }
    } catch (error) {
      console.error("Role Router Error:", error);
      alert('Gagal memuat data pengguna.');
    }
  }
}
