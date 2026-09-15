import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';

const firebaseConfig = {
  apiKey: "AIzaSyC45P_1xbNL8zi3e0aS4kHkIGvRvGEAmwM",
  authDomain: "takkoandi-8e99e.firebaseapp.com",
  databaseURL: "https://takkoandi-8e99e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "takkoandi-8e99e",
  storageBucket: "takkoandi-8e99e.firebasestorage.app",
  messagingSenderId: "117264025083",
  appId: "1:117264025083:web:8102fe737f7783e1b7b75e"
};

console.log(' Firebase API Key:', firebaseConfig.apiKey); // Debug line

const app = initializeApp(firebaseConfig);

export default app;
