import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "designsync-canvas-o7xtf",
  "appId": "1:158710968509:web:f6559691cc77180072c7d4",
  "storageBucket": "designsync-canvas-o7xtf.firebasestorage.app",
  "apiKey": "AIzaSyC9r3EJT_zRejMt_W3idvkzRRos4ZoPfEw",
  "authDomain": "designsync-canvas-o7xtf.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "158710968509"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
