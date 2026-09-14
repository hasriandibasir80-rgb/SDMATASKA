export class EventHandlers {
  constructor() {
    this.navLiveChat = document.getElementById('navLiveChat');
    this.btnMudah = document.getElementById('btnMudah');
    this.btnCoba = document.getElementById('btnCoba');
    this.emailInput = document.getElementById('email');
    
    this.init();
  }

  init() {
    // Live Chat
    if (this.navLiveChat) {
      this.navLiveChat.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Fitur LiveChat akan segera hadir!');
      });
    }

    // Promo Button - Mudah Segalanya
    if (this.btnMudah) {
      this.btnMudah.addEventListener('click', () => {
        alert('Sistem kami mudah digunakan! Silakan login untuk memulai.');
      });
    }

    // Promo Button - Silahkan Coba (scroll to email input)
    if (this.btnCoba) {
      this.btnCoba.addEventListener('click', () => {
        if (this.emailInput) {
          this.emailInput.focus();
          this.emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }
}
