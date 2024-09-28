import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKMyvk4oN9oFMCO1YowVWRXDee5OD4Rs8",
  authDomain: "e-91e83.firebaseapp.com",
  projectId: "e-91e83",
  storageBucket: "e-91e83.appspot.com",
  messagingSenderId: "796669446198",
  appId: "1:796669446198:web:7e3273e87267f3bfc87097"
};

// Initialize Firebase
const app =!getApps().length? initializeApp(firebaseConfig):getApp();
const db = getFirestore(app);
const auth = getAuth(app)
export {app,auth,db}