// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgO-6Chss8Er7MeIyM_Tl7_1wBKqZ7Kvk",
  authDomain: "reactauth-ca0d1.firebaseapp.com",
  projectId: "reactauth-ca0d1",
  storageBucket: "reactauth-ca0d1.appspot.com",
  messagingSenderId: "385853073054",
  appId: "1:385853073054:web:908ad0a8e555aeb8c3fd8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export  {auth, db, storage};