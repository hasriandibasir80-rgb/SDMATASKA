import { Sidebar } from './ui/sidebar.js';
import { ModalManager } from './ui/modal-manager.js';
import { EventHandlers } from './ui/event-handlers.js';
import { AuthService } from './auth/auth-service.js';
import { AppConfig } from './config/app-config.js';

document.addEventListener('DOMContentLoaded', () => {
  new Sidebar();
  new ModalManager();
  new EventHandlers();
  new AuthService();
  
  console.log(`${AppConfig.SCHOOL_NAME} - Sistem Manajemen Sekolah`);
  console.log(`Version: ${AppConfig.VERSION}`);
  console.log('Ready for Firebase integration');
});
