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
    const features = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', url: 'dashboard.html' }
    ];

    // Sesuai v4.1 Bagian 2: Data Master hanya untuk Super Admin, Kepsek, Staf TU
    if (normalizedRole === 'super_admin') {
      features.push(
        { id: 'approval', label: 'Approval User', icon: '✅', url: 'dashboard.html#approval' },
        { id: 'e-dokumen', label: 'e-Dokumen', icon: '📁', url: 'pages/e-dokumen.html' },
        { id: 'administrasi-guru', label: 'Administrasi Guru', icon: '📚', url: 'pages/administrasi-guru.html' },
        { id: 'data-statistik', label: 'Data Statistik', icon: '📈', url: 'pages/data-statistik.html' },
        { id: 'e-portal', label: 'e-Portal', icon: '🔗', url: 'pages/e-portal.html' },
        { id: 'data-master', label: 'Data Master', icon: '🗂️', url: 'pages/data-master.html' }
      );
    } else if (normalizedRole === 'kepala_sekolah') {
      features.push(
        { id: 'e-dokumen', label: 'e-Dokumen', icon: '📁', url: 'pages/e-dokumen.html' },
        { id: 'administrasi-guru', label: 'Administrasi Guru', icon: '📚', url: 'pages/administrasi-guru.html' },
        { id: 'data-statistik', label: 'Data Statistik', icon: '📈', url: 'pages/data-statistik.html' },
        { id: 'e-portal', label: 'e-Portal', icon: '🔗', url: 'pages/e-portal.html' },
        { id: 'data-master', label: 'Data Master', icon: '️', url: 'pages/data-master.html' }
      );
    } else if (normalizedRole === 'staf_tu') {
      features.push(
        { id: 'e-dokumen', label: 'e-Dokumen', icon: '📁', url: 'pages/e-dokumen.html' },
        { id: 'administrasi-guru', label: 'Administrasi Guru', icon: '📚', url: 'pages/administrasi-guru.html' },
        { id: 'data-statistik', label: 'Data Statistik', icon: '📈', url: 'pages/data-statistik.html' },
        { id: 'e-portal', label: 'e-Portal', icon: '🔗', url: 'pages/e-portal.html' },
        { id: 'data-master', label: 'Data Master', icon: '🗂️', url: 'pages/data-master.html' }
      );
    } else if (normalizedRole === 'wali_kelas' || normalizedRole === 'guru_mapel') {
      // BERLAKU ADIL: Guru Mapel dan Wali Kelas mendapat akses SAMA PERSIS
      features.push(
        { id: 'administrasi-guru', label: 'Administrasi Guru', icon: '📚', url: 'pages/administrasi-guru.html' },
        { id: 'data-statistik', label: 'Data Statistik', icon: '📈', url: 'pages/data-statistik.html' },
        { id: 'e-dokumen', label: 'e-Dokumen', icon: '📁', url: 'pages/e-dokumen.html' },
        { id: 'e-portal', label: 'e-Portal', icon: '🔗', url: 'pages/e-portal.html' }
      );
    } else if (normalizedRole === 'siswa') {
      features.push(
        { id: 'jadwal', label: 'Jadwal', icon: '', url: 'dashboard.html#jadwal' },
        { id: 'nilai', label: 'Nilai Saya', icon: '📝', url: 'dashboard.html#nilai' },
        { id: 'materi', label: 'Materi', icon: '📖', url: 'dashboard.html#materi' }
      );
    } else if (normalizedRole === 'orang_tua') {
      features.push(
        { id: 'monitoring', label: 'Monitoring Anak', icon: '‍👩‍', url: 'dashboard.html#monitoring' }
      );
    }

    return features;
  }

  render() {
    const features = this.getFeaturesByRole();
    let html = '';
    features.forEach(feature => {
      html += `<a href="${feature.url}" class="sidebar-item" data-feature="${feature.id}">
        <span class="sidebar-icon">${feature.icon}</span>
        <span class="sidebar-label">${feature.label}</span>
      </a>`;
    });
    this.sidebarContainer.innerHTML = html;
    this.highlightActiveMenu();
  }

  highlightActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const activeItem = this.sidebarContainer.querySelector(`[href="${currentPage}"]`);
    if (activeItem) activeItem.classList.add('active');
  }
}
