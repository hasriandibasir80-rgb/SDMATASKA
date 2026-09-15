export const AppConfig = {
  SCHOOL_NAME: 'SDN 139 LAMANDA',
  SCHOOL_YEAR: '2024/2025',
  VERSION: '1.0.0',
  
  // Roles (Ditambahkan role baru sesuai form daftar-member.html)
  ROLES: {
    SUPER_ADMIN: 'super_admin',
    KEPALA_SEKOLAH: 'kepsek',
    ADMIN_SEKOLAH: 'admin_sekolah',
    GURU_KELAS: 'guru_kelas',
    GURU_MAPEL: 'guru_mapel',
    TENDIK: 'tendik',
    STAF_TU: 'staf_tu',
    WALI_KELAS: 'wali_kelas',
    SISWA: 'siswa',
    ORANG_TUA: 'orang_tua'
  },
  
  // Status Approval (Baru: Untuk sistem isolasi data multi-sekolah)
  APPROVAL_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
  },

  // Features
  FEATURES: {
    E_DOKUMEN: 'e-dokumen',
    ADMINISTRASI_GURU: 'administrasi-guru',
    DATA_STATISTIK: 'data-statistik',
    E_PORTAL: 'e-portal',
    DATA_MASTER: 'data-master'
  }
};
