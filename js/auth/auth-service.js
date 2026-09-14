export class AuthService {
  constructor() {
    this.loading = document.getElementById('loading');
    this.loginForm = document.getElementById('loginForm');
    
    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const captchaInput = document.getElementById('captchaInput').value;
    
    // Captcha validation akan di-handle di main.js
    
    // Show loading
    this.showLoading();
    
    // Simulate login (nanti diganti dengan Firebase)
    setTimeout(() => {
      this.hideLoading();
      alert('Login berhasil! (Demo - Firebase belum diimplementasi)');
      // Redirect ke dashboard akan ditambahkan setelah Firebase setup
    }, 1500);
  }

  showLoading() {
    if (this.loading) {
      this.loading.classList.add('active');
    }
  }

  hideLoading() {
    if (this.loading) {
      this.loading.classList.remove('active');
    }
  }

  // Template method untuk Firebase login (akan diimplementasi nanti)
  async loginWithFirebase(email, password) {
    // TODO: Implement Firebase Authentication
    // await signInWithEmailAndPassword(auth, email, password);
  }

  // Template method untuk logout (akan diimplementasi nanti)
  async logout() {
    // TODO: Implement Firebase sign out
    // await signOut(auth);
  }
}
