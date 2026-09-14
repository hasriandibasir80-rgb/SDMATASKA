import { signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { auth } from '../config/service-firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('dashSidebar');
  const toggleBtn = document.getElementById('toggleSidebar');
  const logoutBtn = document.getElementById('btnLogout');
  const user = JSON.parse(sessionStorage.getItem('currentUser'));

  if (user) {
    document.getElementById('userEmail').textContent = user.email || 'user@sdmataska.sch.id';
    document.getElementById('userRole').textContent = user.role.replace('_', ' ').toUpperCase();
    document.getElementById('userAvatar').textContent = (user.nama || 'A').charAt(0).toUpperCase();
    document.getElementById('welcomeName').textContent = user.nama || 'Admin';
  } else {
    window.location.href = 'index.html';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '›' : '‹';
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (confirm('Apakah Anda yakin ingin keluar?')) {
        try {
          await signOut(auth);
          sessionStorage.removeItem('currentUser');
          window.location.href = 'index.html';
        } catch (error) {
          console.error('Logout error:', error);
          alert('Gagal logout.');
        }
      }
    });
  }
});
