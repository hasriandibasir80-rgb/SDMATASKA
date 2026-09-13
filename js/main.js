// ===== SIDEBAR TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');

function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebarFunc() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openSidebar);
closeSidebar.addEventListener('click', closeSidebarFunc);
overlay.addEventListener('click', closeSidebarFunc);

// ===== CAPTCHA =====
class Captcha {
  constructor() {
    this.captchaCode = '';
    this.captchaElement = document.getElementById('captchaCode');
    this.refreshButton = document.getElementById('refreshCaptcha');
    
    if (this.refreshButton) {
      this.refreshButton.addEventListener('click', () => this.generate());
    }
    
    this.generate();
  }

  generate() {
    this.captchaCode = Math.floor(10000 + Math.random() * 90000).toString();
    if (this.captchaElement) {
      this.captchaElement.textContent = this.captchaCode;
    }
  }

  verify(input) {
    return input === this.captchaCode;
  }
}

const captchaManager = new Captcha();

// ===== MODAL HANDLERS =====
const modalEksplor = document.getElementById('modalEksplor');
const modalDaftar = document.getElementById('modalDaftar');
const modalLupaPassword = document.getElementById('modalLupaPassword');

const navEksplor = document.getElementById('navEksplor');
const navDaftar = document.getElementById('navDaftar');
const btnForgotPassword = document.getElementById('btnForgotPassword');

const closeModalEksplor = document.getElementById('closeModalEksplor');
const closeModalDaftar = document.getElementById('closeModalDaftar');
const closeModalLupaPassword = document.getElementById('closeModalLupaPassword');

const btnSiapLogin = document.getElementById('btnSiapLogin');
const btnBatalDaftar = document.getElementById('btnBatalDaftar');
const btnBatalLupaPassword = document.getElementById('btnBatalLupaPassword');

function openModal(modal) {
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Modal Eksplor
if (navEksplor) {
  navEksplor.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(modalEksplor);
  });
}

if (closeModalEksplor) {
  closeModalEksplor.addEventListener('click', () => closeModal(modalEksplor));
}

if (btnSiapLogin) {
  btnSiapLogin.addEventListener('click', () => closeModal(modalEksplor));
}

// Modal Daftar
if (navDaftar) {
  navDaftar.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(modalDaftar);
  });
}

if (closeModalDaftar) {
  closeModalDaftar.addEventListener('click', () => closeModal(modalDaftar));
}

if (btnBatalDaftar) {
  btnBatalDaftar.addEventListener('click', () => closeModal(modalDaftar));
}

// Modal Lupa Password
if (btnForgotPassword) {
  btnForgotPassword.addEventListener('click', () => openModal(modalLupaPassword));
}

if (closeModalLupaPassword) {
  closeModalLupaPassword.addEventListener('click', () => closeModal(modalLupaPassword));
}

if (btnBatalLupaPassword) {
  btnBatalLupaPassword.addEventListener('click', () => closeModal(modalLupaPassword));
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modalEksplor) closeModal(modalEksplor);
  if (e.target === modalDaftar) closeModal(modalDaftar);
  if (e.target === modalLupaPassword) closeModal(modalLupaPassword);
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(modalEksplor);
    closeModal(modalDaftar);
    closeModal(modalLupaPassword);
  }
});

// ===== LOGIN FORM =====
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const captchaInput = document.getElementById('captchaInput');
const loading = document.getElementById('loading');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;
    const captchaValue = captchaInput.value;
    
    // Verify captcha
    if (!captchaManager.verify(captchaValue)) {
      alert('Captcha salah! Silakan coba lagi.');
      captchaManager.generate();
      captchaInput.value = '';
      return;
    }
    
    // Show loading
    loading.classList.add('active');
    
    // Simulate login (nanti diganti dengan Firebase)
    setTimeout(() => {
      loading.classList.remove('active');
      alert('Login berhasil! (Demo - Firebase belum diimplementasi)');
      // Redirect ke dashboard akan ditambahkan setelah Firebase setup
    }, 1500);
  });
}

// ===== INFO BERJALAN =====
const infoBox = document.getElementById('infoBox');
const infoTitle = document.getElementById('infoTitle');
const infoContent = document.getElementById('infoContent');

// Contoh data info (nanti diambil dari Firebase)
const infoData = [
  { title: 'WALI KELAS 3', content: 'BASRUN' },
  { title: 'WALI KELAS 4', content: 'HASRIAND' }
];

let currentInfoIndex = 0;

function showInfo() {
  if (infoData.length > 0 && infoBox && infoTitle && infoContent) {
    const info = infoData[currentInfoIndex];
    infoTitle.textContent = info.title;
    infoContent.textContent = info.content;
    infoBox.classList.add('show');
    
    currentInfoIndex = (currentInfoIndex + 1) % infoData.length;
    
    setTimeout(() => {
      infoBox.classList.remove('show');
      setTimeout(showInfo, 2000);
    }, 5000);
  }
}

// Start info rotation after 3 seconds
setTimeout(showInfo, 3000);

// ===== LIVE CHAT (Placeholder) =====
const navLiveChat = document.getElementById('navLiveChat');

if (navLiveChat) {
  navLiveChat.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Fitur LiveChat akan segera hadir!');
    // Nanti akan diintegrasikan dengan Firebase atau layanan chat lainnya
  });
}

// ===== PROMO BUTTONS =====
const btnMudah = document.getElementById('btnMudah');
const btnCoba = document.getElementById('btnCoba');

if (btnMudah) {
  btnMudah.addEventListener('click', () => {
    alert('Sistem kami mudah digunakan! Silakan login untuk memulai.');
  });
}

if (btnCoba) {
  btnCoba.addEventListener('click', () => {
    emailInput.focus();
    emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('SDMATASKA - Sistem Manajemen SDN 139 LAMANDA');
  console.log('Ready for Firebase integration');
});
