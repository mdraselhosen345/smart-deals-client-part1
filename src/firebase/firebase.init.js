// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3OZXROVSa_W9QxePkrtBasbERoiMbkr0",
  authDomain: "smart-deals1-1c143.firebaseapp.com",
  projectId: "smart-deals1-1c143",
  storageBucket: "smart-deals1-1c143.firebasestorage.app",
  messagingSenderId: "470554599326",
  appId: "1:470554599326:web:55b934243a1e442d44808f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);