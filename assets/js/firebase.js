// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALx7QCh43uZDTc1BVJGLUhz0iCscdp8PE",
  authDomain: "red-social-2543b.firebaseapp.com",
  projectId: "red-social-2543b",
  storageBucket: "red-social-2543b.appspot.com",
  messagingSenderId: "789674687356",
  appId: "1:789674687356:web:15b2e3af8359640f4b42f9",
};

// Initialize Firebase y se exporta la app
export const app = initializeApp(firebaseConfig);