export class ModalManager {
  constructor() {
    this.modals = {
      eksplor: document.getElementById('modalEksplor'),
      daftar: document.getElementById('modalDaftar'),
      lupaPassword: document.getElementById('modalLupaPassword')
    };

    this.triggers = {
      navEksplor: document.getElementById('navEksplor'),
      navDaftar: document.getElementById('navDaftar'),
      btnForgotPassword: document.getElementById('btnForgotPassword')
    };

    this.closeButtons = {
      eksplor: document.getElementById('closeModalEksplor'),
      daftar: document.getElementById('closeModalDaftar'),
      lupaPassword: document.getElementById('closeModalLupaPassword')
    };

    this.actionButtons = {
      btnSiapLogin: document.getElementById('btnSiapLogin'),
      btnBatalDaftar: document.getElementById('btnBatalDaftar'),
      btnBatalLupaPassword: document.getElementById('btnBatalLupaPassword')
    };

    this.init();
  }

  init() {
    // Modal Eksplor
    if (this.triggers.navEksplor) {
      this.triggers.navEksplor.addEventListener('click', (e) => {
        e.preventDefault();
        this.open('eksplor');
      });
    }

    if (this.closeButtons.eksplor) {
      this.closeButtons.eksplor.addEventListener('click', () => this.close('eksplor'));
    }

    if (this.actionButtons.btnSiapLogin) {
      this.actionButtons.btnSiapLogin.addEventListener('click', () => this.close('eksplor'));
    }

    // Modal Daftar
    if (this.triggers.navDaftar) {
      this.triggers.navDaftar.addEventListener('click', (e) => {
        e.preventDefault();
        this.open('daftar');
      });
    }

    if (this.closeButtons.daftar) {
      this.closeButtons.daftar.addEventListener('click', () => this.close('daftar'));
    }

    if (this.actionButtons.btnBatalDaftar) {
      this.actionButtons.btnBatalDaftar.addEventListener('click', () => this.close('daftar'));
    }

    // Modal Lupa Password
    if (this.triggers.btnForgotPassword) {
      this.triggers.btnForgotPassword.addEventListener('click', () => this.open('lupaPassword'));
    }

    if (this.closeButtons.lupaPassword) {
      this.closeButtons.lupaPassword.addEventListener('click', () => this.close('lupaPassword'));
    }

    if (this.actionButtons.btnBatalLupaPassword) {
      this.actionButtons.btnBatalLupaPassword.addEventListener('click', () => this.close('lupaPassword'));
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === this.modals.eksplor) this.close('eksplor');
      if (e.target === this.modals.daftar) this.close('daftar');
      if (e.target === this.modals.lupaPassword) this.close('lupaPassword');
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close('eksplor');
        this.close('daftar');
        this.close('lupaPassword');
      }
    });
  }

  open(modalName) {
    if (this.modals[modalName]) {
      this.modals[modalName].classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  close(modalName) {
    if (this.modals[modalName]) {
      this.modals[modalName].classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}
