import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { auth } from '../config/service-firebase.js';
import { Captcha } from '../utils/captcha.js';
import { RoleRouter } from './role-router.js';

export class AuthService {
  constructor() {
    this.loginForm = document.getElementById('loginForm');
    this.loading = document.getElementById('loading');
    this.captchaManager = new Captcha();
    this.roleRouter = new RoleRouter();

    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }
  }

  async handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const captchaInput = document.getElementById('captchaInput').value.trim();

    // 1. Validasi Captcha
    if (!this.captchaManager.verify(captchaInput)) {
      alert('Captcha salah! Silakan coba lagi.');
      this.captchaManager.generate();
      document.getElementById('captchaInput').value = '';
      return;
    }

    // 2. Tampilkan Loading
    this.toggleLoading(true);

    try {
      // 3. Proses Login Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 4. Redirect berdasarkan Role
      await this.roleRouter.redirectByRole(user.uid);

    } catch (error) {
      console.error("Login Error:", error);
      let errorMessage = "Terjadi kesalahan saat login.";
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = "Email atau password salah.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Terlalu banyak percobaan. Silakan coba lagi nanti.";
      }
      
      alert(errorMessage);
      this.captchaManager.generate();
      document.getElementById('captchaInput').value = '';
    } finally {
      this.toggleLoading(false);
    }
  }

  toggleLoading(show) {
    if (this.loading) {
      show ? this.loading.classList.add('active') : this.loading.classList.remove('active');
    }
  }

  async logout() {
    this.toggleLoading(true);
    try {
      await auth.signOut();
      window.location.href = 'index.html';
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Gagal logout. Silakan coba lagi.");
    } finally {
      this.toggleLoading(false);
    }
  }
}
