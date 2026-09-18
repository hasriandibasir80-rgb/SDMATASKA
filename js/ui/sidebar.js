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

  getNormalizedRole() {
    const aliasMap = {
      'guru_kelas': 'wali_kelas',
      'admin_sekolah': 'staf_tu',
      'tendik': 'staf_tu',
      'ortu': 'orang_tua'
    };
    return aliasMap[this.role] || this.role;
  }

  getFeaturesByRole() {
    const normalizedRole = this.getNormalizedRole();
    
    // Semua role bisa akses Dashboard
    const features = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', url: 'dashboard.html' }
    ];

    // Tambahkan fitur berdasarkan role
    if (normalizedRole === 'super_admin') {
      features.push(
        { id: 'approval', label: 'Approval User', icon: '✅', url: 'dashboard.html#approval' },
        { id: 'e-dokumen', label: 'e-Dokumen', icon: '📁', url: 'e-dokumen.html' },
        { id: 'administrasi-guru', label: 'Administrasi Guru', icon: '', url: 'administrasi-guru.html' },
        { id: 'data-statistik', label: 'Data Statistik', icon: '📈', url: 'data-statistik.html' },
        { id: 'e-portal', label: 'e-Portal', icon: '🔗', url: 'e-portal.html' },
        { id: 'data-master', label: 'Data Master', icon: '🗂️', url: 'data-master.html' }
      );
    } else if (normalizedRole === 'kepala_sekolah') {
      features.push(
        { id: 'e-dokumen', label: 'e-Dokumen', icon: '📁', url: 'e-dokumen.html' },
        { id: 'data-statistik', label: 'Data Statistik', icon: '📈', url: 'data-statistik.html' },
        { id: 'e-portal', label: 'e-Portal', icon: '🔗', url: 'e-portal.html' }
      );
    } else if (normalizedRole === 'staf_tu') {
      features.push(
        { id: 'e-dokumen', label: 'e-Dokumen', icon: '📁', url: 'e-dokumen.html' },
        { id: 'administrasi-guru', label: 'Administrasi Guru', icon: '📚', url: 'administrasi-guru.html' },
        { id: 'data-statistik', label: 'Data Statistik', icon: '', url: 'data-statistik.html' },
        { id: 'e-portal', label: 'e-Portal', icon: '', url: 'e-portal.html' },
        { id: 'data-master', label: 'Data Master', icon: '🗂️', url: 'data-master.html' }
      );
    } else if (normalizedRole === 'wali_kelas') {
      features.push(
        { id: 'administrasi-guru', label: 'Administrasi Guru', icon: '📚', url: 'administrasi-guru.html' },
        { id: 'data-statistik', label: 'Data Statistik', icon: '📈', url: 'data-statistik.html' }
      );
    } else if (normalizedRole === 'guru_mapel') {
      features.push(
        { id: 'administrasi-guru', label: 'Administrasi Guru', icon: '📚', url: 'administrasi-guru.html' },
        { id: 'e-dokumen', label: 'e-Dokumen', icon: '📁', url: 'e-dokumen.html' }
      );
    } else if (normalizedRole === 'siswa') {
      features.push(
        { id: 'jadwal', label: 'Jadwal', icon: '📅', url: 'dashboard.html#jadwal' },
        { id: 'nilai', label: 'Nilai Saya', icon: '📝', url: 'dashboard.html#nilai' },
        { id: 'materi', label: 'Materi', icon: '📖', url: 'dashboard.html#materi' }
      );
    } else if (normalizedRole === 'orang_tua') {
      features.push(
        { id: 'monitoring', label: 'Monitoring Anak', icon: '️', url: 'dashboard.html#monitoring' }
      );
    }

    return features;
  }

  render() {
    const features = this.getFeaturesByRole();

    let html = '';
    features.forEach(feature => {
      html += `
        <a href="${feature.url}" class="sidebar-item" data-feature="${feature.id}">
          <span class="sidebar-icon">${feature.icon}</span>
          <span class="sidebar-label">${feature.label}</span>
        </a>
      `;
    });

    html += `
      <a href="#" class="sidebar-item" id="logout-btn" style="margin-top: auto; color: #ff4444;">
        <span class="sidebar-icon">🚪</span>
        <span class="sidebar-label">Keluar</span>
      </a>
    `;

    this.sidebarContainer.innerHTML = html;

    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleLogout();
    });

    this.highlightActiveMenu();
  }

  highlightActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const activeItem = this.sidebarContainer.querySelector(`[href="${currentPage}"]`);
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
