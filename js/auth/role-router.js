import { AppConfig } from '../config/app-config.js';

export class RoleRouter {
  constructor() {
    this.routes = {
      [AppConfig.ROLES.SUPER_ADMIN]: 'dashboard-admin.html',
      [AppConfig.ROLES.KEPALA_SEKOLAH]: 'dashboard-kepsek.html',
      [AppConfig.ROLES.ADMIN_SEKOLAH]: 'dashboard-admin.html',
      [AppConfig.ROLES.GURU_KELAS]: 'dashboard-guru.html',
      [AppConfig.ROLES.GURU_MAPEL]: 'dashboard-guru.html',
      [AppConfig.ROLES.TENDIK]: 'dashboard-tu.html',
      [AppConfig.ROLES.STAF_TU]: 'dashboard-tu.html',
      [AppConfig.ROLES.WALI_KELAS]: 'dashboard-wali-kelas.html',
      [AppConfig.ROLES.SISWA]: 'dashboard-siswa.html',
      [AppConfig.ROLES.ORANG_TUA]: 'dashboard-ortu.html'
    };
  }

  async redirectByRole(uid, userData = null, userSource = 'root') {
    try {
      if (!userData) {
        throw new Error("Data pengguna tidak tersedia. Silakan login ulang.");
      }

      const role = userData.jabatan || userData.role;
      const targetPage = this.routes[role];

      if (targetPage) {
        sessionStorage.setItem('currentUser', JSON.stringify({
          uid: userData.uid,
          email: userData.email || '',
          role: role,
          nama: userData.nama,
          nip: userData.nip || '',
          npsn: userData.npsn || '',
          nama_sekolah: userData.nama_sekolah || '',
          nama_kepsek: userData.nama_kepsek || '',
          nip_kepsek: userData.nip_kepsek || '',
          kelas_id: userData.kelas_id || '',
          mapel_diajar: userData.mapel_diajar || [],
          userSource: userSource 
        }));
        
        window.location.href = targetPage;
      } else {
        alert('Role tidak dikenali. Hubungi Admin.');
        window.location.href = 'index.html';
      }
    } catch (error) {
      console.error("Role Router Error:", error);
      alert('Gagal memuat data pengguna. Silakan login ulang.');
      window.location.href = 'index.html';
    }
  }
}
