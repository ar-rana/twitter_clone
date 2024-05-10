// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "AIzaSyCs1xF6PZ8sPwThV0G3yfyOWQRi8pYXm7g",
  projectId: "twitter-clone-12c3b",
  storageBucket: "twitter-clone-12c3b.appspot.com",
  messagingSenderId: "329548207926",
  appId: "1:329548207926:web:854d2f2d7257761d7d8597",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage }
