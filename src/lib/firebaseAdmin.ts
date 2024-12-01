// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuHvaE147D3RekVQGpbkk79qHYgPcW1As",
  authDomain: "kelembaban-ruang.firebaseapp.com",
  databaseURL: "https://kelembaban-ruang-default-rtdb.firebaseio.com",
  projectId: "kelembaban-ruang",
  storageBucket: "kelembaban-ruang.firebasestorage.app",
  messagingSenderId: "686662801916",
  appId: "1:686662801916:web:f1bb434c3961b1ba4bba79",
  measurementId: "G-MD09XP4HML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }
export default app