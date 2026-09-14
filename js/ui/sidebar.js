export class Sidebar {
  constructor() {
    this.menuToggle = document.getElementById('menuToggle');
    this.sidebar = document.getElementById('sidebar');
    this.closeSidebar = document.getElementById('closeSidebar');
    this.overlay = document.getElementById('overlay');
    
    this.init();
  }

  init() {
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.open());
    }
    
    if (this.closeSidebar) {
      this.closeSidebar.addEventListener('click', () => this.close());
    }
    
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }
  }

  open() {
    if (this.sidebar) {
      this.sidebar.classList.add('active');
    }
    if (this.overlay) {
      this.overlay.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.sidebar) {
      this.sidebar.classList.remove('active');
    }
    if (this.overlay) {
      this.overlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }
}
