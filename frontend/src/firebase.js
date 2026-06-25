// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqJhUqZKE7OWG5C3jmrRtBfg8v8fICLoY",
  authDomain: "ecommerce-task-4.firebaseapp.com",
  projectId: "ecommerce-task-4",
  storageBucket: "ecommerce-task-4.firebasestorage.app",
  messagingSenderId: "834624879636",
  appId: "1:834624879636:web:b00ebe507fa03483cafb01",
  measurementId: "G-WMWLJQVVBV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
