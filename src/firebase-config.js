// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmyM6TD7wxGjHi0uIEHe3T-i8lTyDBen4",
  authDomain: "chat2-60790.firebaseapp.com",
  projectId: "chat2-60790",
  storageBucket: "chat2-60790.appspot.com",
  messagingSenderId: "428609934385",
  appId: "1:428609934385:web:ab2c65bd21ec73cec6f110",
  measurementId: "G-Z7FVHZ07JV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider()