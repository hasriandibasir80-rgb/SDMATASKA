import { AppConfig } from '../config/app-config.js';

export class RoleRouter {
  constructor() {
    // Semua role diarahkan ke dashboard.html universal (v4.1)
    // Sidebar akan merender menu berbeda berdasarkan role
    this.routes = {
      [AppConfig.ROLES.SUPER_ADMIN]: 'dashboard.html',
      [AppConfig.ROLES.KEPALA_SEKOLAH]: 'dashboard.html',
      [AppConfig.ROLES.ADMIN_SEKOLAH]: 'dashboard.html',
      [AppConfig.ROLES.GURU_KELAS]: 'dashboard.html',
      [AppConfig.ROLES.GURU_MAPEL]: 'dashboard.html',
      [AppConfig.ROLES.TENDIK]: 'dashboard.html',
      [AppConfig.ROLES.STAF_TU]: 'dashboard.html',
      [AppConfig.ROLES.WALI_KELAS]: 'dashboard.html',
      [AppConfig.ROLES.SISWA]: 'dashboard.html',
      [AppConfig.ROLES.ORANG_TUA]: 'dashboard.html'
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
