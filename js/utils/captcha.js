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
      this.captchaElement.textContent = this.captchaCode;
    }
  }

  verify(input) {
    return input === this.captchaCode;
  }
}
