import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { auth } from '../config/service-firebase.js';

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'index.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('attendanceChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        datasets: [{
          label: 'Kehadiran (%)',
          data: [92, 96, 94, 98, 89, 85],
          backgroundColor: '#2a5298',
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, max: 100 } }
      }
    });
  }

  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('id-ID', options);
  }
});
