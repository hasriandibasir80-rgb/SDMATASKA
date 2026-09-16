import { signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { auth } from '../config/service-firebase.js';

export class AuthService {
  constructor() {
    this.loading = document.getElementById('loading');
  }

  async logout() {
    this.toggleLoading(true);
    try {
      await signOut(auth);
      sessionStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Gagal logout. Silakan coba lagi.");
    } finally {
      this.toggleLoading(false);
    }
  }

  toggleLoading(show) {
    if (this.loading) {
      show ? this.loading.classList.add('active') : this.loading.classList.remove('active');
    }
  }
}
