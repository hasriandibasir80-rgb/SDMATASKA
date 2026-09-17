export class Captcha {
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
    // Generate 5 digit random number
    this.captchaCode = Math.floor(10000 + Math.random() * 90000).toString();
    if (this.captchaElement) {
      // Tampilkan dengan spasi untuk kemudahan membaca
      this.captchaElement.textContent = this.captchaCode.split('').join(' ');
    }
  }

  verify(input) {
    // Hapus spasi dari input user dan bandingkan
    const inputClean = input.trim().replace(/\s/g, '');
    return inputClean === this.captchaCode;
  }
}
