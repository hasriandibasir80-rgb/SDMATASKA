import { Captcha } from './utils/captcha.js';
import { Sidebar } from './ui/sidebar.js';
import { ModalManager } from './ui/modal-manager.js';
import { EventHandlers } from './ui/event-handlers.js';
import { AuthService } from './auth/auth-service.js';
import { AppConfig } from './config/app-config.js';

// Initialize modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Captcha
  const captchaManager = new Captcha();
  
  // Initialize Sidebar
  new Sidebar();
  
  // Initialize Modal Manager
  new ModalManager();
  
  // Initialize Event Handlers
  new EventHandlers();
  
  // Initialize Auth Service (akan handle login form)
  const authService = new AuthService();
  
  // Validate captcha before login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      const captchaInput = document.getElementById('captchaInput').value;
      if (!captchaManager.verify(captchaInput)) {
        e.preventDefault();
        alert('Captcha salah! Silakan coba lagi.');
        captchaManager.generate();
        document.getElementById('captchaInput').value = '';
      }
    });
  }
  
  console.log(`${AppConfig.SCHOOL_NAME} - Sistem Manajemen Sekolah`);
  console.log(`Version: ${AppConfig.VERSION}`);
  console.log('Ready for Firebase integration');
});
