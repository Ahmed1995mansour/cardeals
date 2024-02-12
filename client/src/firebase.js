// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'cardeals-2024.firebaseapp.com',
  projectId: 'cardeals-2024',
  storageBucket: 'cardeals-2024.appspot.com',
  messagingSenderId: '694725881041',
  appId: '1:694725881041:web:8f490f7e1d321c5cfee9f0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
