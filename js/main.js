import { Sidebar } from './ui/sidebar.js';
import { ModalManager } from './ui/modal-manager.js';
import { EventHandlers } from './ui/event-handlers.js';
import { AuthLogin } from './auth/auth-login.js'; // Diubah dari AuthService
import { AppConfig } from './config/app-config.js';

document.addEventListener('DOMContentLoaded', () => {
  new Sidebar();
  new ModalManager();
  new EventHandlers();
  new AuthLogin(); // Memanggil class login baru
  
  console.log(`${AppConfig.SCHOOL_NAME} - Sistem Manajemen Sekolah`);
  console.log(`Version: ${AppConfig.VERSION}`);
  console.log('Ready for Firebase integration');
});
