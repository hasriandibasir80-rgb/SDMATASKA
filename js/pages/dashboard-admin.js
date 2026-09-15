import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { auth } from '../config/service-firebase.js';
import { AppConfig } from '../config/app-config.js';
import { ApprovalManager } from '../admin/approval-manager.js';

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'index.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. LOGIKA LAMA: Inisialisasi Chart (Tetap dipertahankan)
  const ctx = document.getElementById('attendanceChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        datasets: [{
          label: 'Kehadiran (%)',
          data: [92, 96, 94, 98, 89, 85],
          backgroundColor: '#2a5298',
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, max: 100 } }
      }
    });
  }

  // 2. LOGIKA LAMA: Format Tanggal (Tetap dipertahankan)
  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('id-ID', options);
  }

  // 3. LOGIKA BARU: Role-based UI & View Switching
  const user = JSON.parse(sessionStorage.getItem('currentUser'));
  const menuApproval = document.getElementById('menuApproval');
  const viewDashboard = document.getElementById('viewDashboard');
  const viewApproval = document.getElementById('viewApproval');
  const breadcrumb = document.getElementById('breadcrumb');

  // Tampilkan menu Approval hanya jika role adalah super_admin
  if (user && user.role === AppConfig.ROLES.SUPER_ADMIN) {
    if (menuApproval) {
      menuApproval.style.display = 'flex'; // Menampilkan menu yang sebelumnya hidden
    }

    // Logika perpindahan tampilan (Dashboard <-> Approval)
    const navItems = document.querySelectorAll('.dash-nav-item[data-view]');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Reset kelas active
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        const view = item.getAttribute('data-view');

        if (view === 'dashboard') {
          if (viewDashboard) viewDashboard.style.display = 'block';
          if (viewApproval) viewApproval.style.display = 'none';
          if (breadcrumb) breadcrumb.textContent = 'Admin / Dashboard';
        } else if (view === 'approval') {
          if (viewDashboard) viewDashboard.style.display = 'none';
          if (viewApproval) viewApproval.style.display = 'block';
          if (breadcrumb) breadcrumb.textContent = 'Admin / Approval User';
          
          // Refresh data approval saat tab dibuka
          if (window.approvalManagerInstance) {
            window.approvalManagerInstance.loadPendingUsers();
          }
        }
      });
    });

    // Inisialisasi Approval Manager
    const pendingListContainer = document.getElementById('pendingUsersList');
    if (pendingListContainer) {
      window.approvalManagerInstance = new ApprovalManager('pendingUsersList');
      
      // Event listener untuk tombol refresh manual
      const btnRefresh = document.getElementById('btnRefreshApproval');
      if (btnRefresh) {
        btnRefresh.addEventListener('click', () => {
          window.approvalManagerInstance.loadPendingUsers();
        });
      }
    }
  }
});
