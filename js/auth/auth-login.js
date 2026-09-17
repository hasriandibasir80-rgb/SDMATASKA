import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { auth, db } from '../config/service-firebase.js';
import { Captcha } from '../utils/captcha.js';
import { RoleRouter } from './role-router.js';
import { AppConfig } from '../config/app-config.js';

export class AuthLogin {
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

    this.toggleLoading(true);

    try {
      // 2. Proses Login Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 3. Direct Read ke referensi user di root (Cepat & Tanpa Index)
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await auth.signOut();
        alert('Data referensi user tidak ditemukan. Hubungi Administrator.');
        this.captchaManager.generate();
        document.getElementById('captchaInput').value = '';
        return;
      }

      const userData = userSnap.data();

      // 4. Validasi Status Approval (Super Admin otomatis lolos)
      if (userData.role !== AppConfig.ROLES.SUPER_ADMIN) {
        if (userData.approval_status === AppConfig.APPROVAL_STATUS.PENDING) {
          await auth.signOut();
          alert('Akun Anda masih menunggu persetujuan Admin.');
          this.captchaManager.generate();
          document.getElementById('captchaInput').value = '';
          return;
        }
        if (userData.approval_status === AppConfig.APPROVAL_STATUS.REJECTED) {
          await auth.signOut();
          alert('Akun Anda telah ditolak. Silakan hubungi Administrator.');
          this.captchaManager.generate();
          document.getElementById('captchaInput').value = '';
          return;
        }
      }

      // 5. Redirect
      await this.roleRouter.redirectByRole(user.uid, userData);

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
}

// Inisialisasi otomatis jika file ini dimuat
document.addEventListener('DOMContentLoaded', () => {
  new AuthLogin();
});
