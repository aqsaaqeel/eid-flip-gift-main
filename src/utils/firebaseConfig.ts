import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTEh6ICGayIl7hA8qk3Rf6ws9dxYJflm0",
  authDomain: "send-eidi-d61a8.firebaseapp.com",
  projectId: "send-eidi-d61a8",
  storageBucket: "send-eidi-d61a8.firebasestorage.app",
  messagingSenderId: "510931867344",
  appId: "1:510931867344:web:3c07bc63650f375be7f0d5",
  measurementId: "G-7WBKYYG03N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, setDoc, getDoc };
