import { signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { auth, db } from '../config/service-firebase.js';
import { Captcha } from '../utils/captcha.js';
import { RoleRouter } from './role-router.js';
import { AppConfig } from '../config/app-config.js';

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

    if (!this.captchaManager.verify(captchaInput)) {
      alert('Captcha salah! Silakan coba lagi.');
      this.captchaManager.generate();
      document.getElementById('captchaInput').value = '';
      return;
    }

    this.toggleLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // STEP 1: Baca referensi di root (Sangat cepat, tanpa index)
      const rootUserRef = doc(db, 'users', user.uid);
      const rootUserSnap = await getDoc(rootUserRef);

      if (!rootUserSnap.exists()) {
        await signOut(auth);
        alert('Data referensi user tidak ditemukan. Hubungi Administrator.');
        return;
      }

      const rootData = rootUserSnap.data();
      const schoolId = rootData.school_id;

      // STEP 2: Baca data lengkap dari nested collection
      let userData = rootData; // Default pakai data root
      
      if (schoolId) {
        const nestedUserRef = doc(db, 'schools', schoolId, 'users', user.uid);
        const nestedUserSnap = await getDoc(nestedUserRef);
        if (nestedUserSnap.exists()) {
          userData = nestedUserSnap.data();
        }
      }

      // Validasi Approval (Super Admin otomatis lolos)
      if (userData.role !== 'super_admin') {
        if (userData.approval_status === 'pending') {
          await signOut(auth);
          alert('Akun Anda masih menunggu persetujuan Admin.');
          return;
        }
        if (userData.approval_status === 'rejected') {
          await signOut(auth);
          alert('Akun Anda telah ditolak. Silakan hubungi Administrator.');
          return;
        }
      }

      // Redirect
      await this.roleRouter.redirectByRole(user.uid, userData);

    } catch (error) {
      console.error("Login Error:", error);
      let errorMessage = "Terjadi kesalahan saat login.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        errorMessage = "Email atau password salah.";
      }
      alert(errorMessage);
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
