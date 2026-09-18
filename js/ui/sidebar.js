import { AppConfig } from '../config/app-config.js';

export class Sidebar {
  constructor() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.role = this.currentUser.role;
    this.sidebarContainer = document.getElementById('sidebar-menu');
    
    if (this.sidebarContainer) {
      this.render();
    }
  }

  getMenuConfig() {
    return {
      super_admin: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', url: 'dashboard.html' },
        { id: 'approval', label: 'Approval User', icon: '✅', url: 'dashboard.html#approval' },
        { id: 'schools', label: 'Kelola Sekolah', icon: '', url: 'dashboard.html#schools' },
        { id: 'master-data', label: 'Data Master', icon: '📁', url: 'dashboard.html#master-data' },
        { id: 'reports', label: 'Laporan Global', icon: '📈', url: 'dashboard.html#reports' },
        { id: 'settings', label: 'Pengaturan', icon: '⚙️', url: 'dashboard.html#settings' }
      ],
      kepala_sekolah: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', url: 'dashboard.html' },
        { id: 'statistics', label: 'Data Statistik', icon: '📈', url: 'dashboard.html#statistics' },
        { id: 'academic', label: 'Data Akademik', icon: '📚', url: 'dashboard.html#academic' },
        { id: 'reports', label: 'Laporan', icon: '📄', url: 'dashboard.html#reports' },
        { id: 'e-portal', label: 'E-Portal', icon: '', url: 'dashboard.html#e-portal' }
      ],
      staf_tu: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', url: 'dashboard.html' },
        { id: 'master-data', label: 'Data Master', icon: '📁', url: 'dashboard.html#master-data' },
        { id: 'students', label: 'Data Siswa', icon: '👨‍', url: 'dashboard.html#students' },
        { id: 'teachers', label: 'Data Guru', icon: '👨‍🏫', url: 'dashboard.html#teachers' },
        { id: 'classes', label: 'Data Kelas', icon: '🏫', url: 'dashboard.html#classes' },
        { id: 'e-documents', label: 'E-Dokumen', icon: '📄', url: 'dashboard.html#e-documents' },
        { id: 'e-portal', label: 'E-Portal', icon: '🔗', url: 'dashboard.html#e-portal' }
      ],
      wali_kelas: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', url: 'dashboard.html' },
        { id: 'my-class', label: 'Kelas Saya', icon: '', url: 'dashboard.html#my-class' },
        { id: 'attendance', label: 'Absensi', icon: '📋', url: 'dashboard.html#attendance' },
        { id: 'grades', label: 'Nilai Siswa', icon: '📝', url: 'dashboard.html#grades' },
        { id: 'reports', label: 'Rapor', icon: '', url: 'dashboard.html#reports' }
      ],
      guru_mapel: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', url: 'dashboard.html' },
        { id: 'admin-guru', label: 'Administrasi Guru', icon: '📚', url: 'dashboard.html#admin-guru' },
        { id: 'rpp', label: 'RPP', icon: '📋', url: 'dashboard.html#rpp' },
        { id: 'question-bank', label: 'Bank Soal', icon: '❓', url: 'dashboard.html#question-bank' },
        { id: 'grades', label: 'Input Nilai', icon: '📝', url: 'dashboard.html#grades' },
        { id: 'materials', label: 'Materi', icon: '', url: 'dashboard.html#materials' },
        { id: 'attendance', label: 'Absensi', icon: '📋', url: 'dashboard.html#attendance' }
      ],
      siswa: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', url: 'dashboard.html' },
        { id: 'schedule', label: 'Jadwal', icon: '📅', url: 'dashboard.html#schedule' },
        { id: 'grades', label: 'Nilai Saya', icon: '📝', url: 'dashboard.html#grades' },
        { id: 'materials', label: 'Materi', icon: '📖', url: 'dashboard.html#materials' },
        { id: 'attendance', label: 'Absensi', icon: '📋', url: 'dashboard.html#attendance' },
        { id: 'assignments', label: 'Tugas', icon: '✏️', url: 'dashboard.html#assignments' }
      ],
      orang_tua: [
        { id: 'dashboard', label: 'Dashboard', icon: '', url: 'dashboard.html' },
        { id: 'child-grades', label: 'Nilai Anak', icon: '📝', url: 'dashboard.html#child-grades' },
        { id: 'child-attendance', label: 'Absensi Anak', icon: '📋', url: 'dashboard.html#child-attendance' },
        { id: 'announcements', label: 'Pengumuman', icon: '📢', url: 'dashboard.html#announcements' }
      ]
    };
  }

  render() {
    const menuConfig = this.getMenuConfig();
    const menus = menuConfig[this.role] || [];

    let html = '';
    menus.forEach(menu => {
      html += `
        <a href="${menu.url}" class="sidebar-item" data-section="${menu.id}">
          <span class="sidebar-icon">${menu.icon}</span>
          <span class="sidebar-label">${menu.label}</span>
        </a>
      `;
    });

    // Tambahkan tombol Logout
    html += `
      <a href="#" class="sidebar-item" id="logout-btn" style="margin-top: auto; color: #ff4444;">
        <span class="sidebar-icon"></span>
        <span class="sidebar-label">Keluar</span>
      </a>
    `;

    this.sidebarContainer.innerHTML = html;

    // Event listener untuk logout
    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleLogout();
    });

    // Highlight menu aktif berdasarkan hash URL
    this.highlightActiveMenu();
  }

  highlightActiveMenu() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const activeItem = this.sidebarContainer.querySelector(`[data-section="${hash}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  }

  handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      sessionStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    }
  }
}
