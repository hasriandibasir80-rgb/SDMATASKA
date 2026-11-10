import { Sidebar } from './ui/sidebar.js';
import { ModalManager } from './ui/modal-manager.js';
import { EventHandlers } from './ui/event-handlers.js';
import { AuthService } from './auth/auth-service.js';
import { AppConfig } from './config/app-config.js';

import { SupabaseService }
from './services/supabase-service.js';

document.addEventListener('DOMContentLoaded', async () => {

  new Sidebar();
  new ModalManager();
  new EventHandlers();
  new AuthService();

  console.log(`${AppConfig.SCHOOL_NAME} - Sistem Manajemen Sekolah`);
  console.log(`Version: ${AppConfig.VERSION}`);

  const guru =
      await SupabaseService.getGuru();

  console.log('Data Guru Supabase:', guru);

});
