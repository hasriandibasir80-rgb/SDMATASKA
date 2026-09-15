import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';

const firebaseConfig = {
  apiKey: "AIzaSyAINgbaO0_HUyE8gJiNH6qdXIFo_n_QBvI",
  authDomain: "salamdmataska.firebaseapp.com",
  projectId: "salamdmataska",
  storageBucket: "salamdmataska.firebasestorage.app",
  messagingSenderId: "60672688704",
  appId: "1:60672688704:web:b600e865c19445ec7495a5",
  measurementId: "G-ZHE0TR058H"
};

console.log(' Firebase API Key:', firebaseConfig.apiKey); // Debug line

const app = initializeApp(firebaseConfig);

export default app;
