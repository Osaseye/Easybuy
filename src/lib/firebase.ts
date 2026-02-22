import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBzplNgfQBUdhtbFf4-qt7ht86Z91YVmDg",
  authDomain: "easybuy-8767d.firebaseapp.com",
  projectId: "easybuy-8767d",
  storageBucket: "easybuy-8767d.firebasestorage.app",
  messagingSenderId: "631970088524",
  appId: "1:631970088524:web:80a8f0894cb4929c5456e9",
  measurementId: "G-QGMLG0EP5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser environment
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
