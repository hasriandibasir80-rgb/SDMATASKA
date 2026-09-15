import { signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { auth } from '../config/service-firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('dashSidebar');
  const toggleBtn = document.getElementById('toggleSidebar');
  const logoutBtn = document.getElementById('btnLogout');
  const user = JSON.parse(sessionStorage.getItem('currentUser'));

  if (user) {
    // Update elemen yang sudah ada (dengan pengecekan aman)
    const emailEl = document.getElementById('userEmail');
    if (emailEl) emailEl.textContent = user.email || 'user@sdmataska.sch.id';
    
    const roleEl = document.getElementById('userRole');
    if (roleEl) roleEl.textContent = user.role.replace(/_/g, ' ').toUpperCase();
    
    const avatarEl = document.getElementById('userAvatar');
    if (avatarEl) avatarEl.textContent = (user.nama || 'A').charAt(0).toUpperCase();
    
    const welcomeEl = document.getElementById('welcomeName');
    if (welcomeEl) welcomeEl.textContent = user.nama || 'Admin';

    // Update elemen auto-fill baru (jika ada di HTML)
    const nipEl = document.getElementById('userNip');
    if (nipEl) nipEl.textContent = user.nip || '-';

    const schoolEl = document.getElementById('userSchool');
    if (schoolEl) schoolEl.textContent = user.nama_sekolah || '-';

    const kepsekEl = document.getElementById('userKepsek');
    if (kepsekEl) kepsekEl.textContent = user.nama_kepsek || '-';
  } else {
    window.location.href = 'index.html';
  }

  if (toggleBtn && sidebar) {
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
