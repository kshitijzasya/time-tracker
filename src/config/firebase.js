// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { Firebase } from "./api";

const settings = {timestampsInSnapshots: true};

// Your web app's Firebase configuration
const firebaseConfig = { Firebase};
console.log('Firebase', {firebaseConfig, apiKey: "AIzaSyBWWl8pSvQhGC-07C0IAfqlwnrM4O5GI_E",
authDomain: "hrmtracker-696e0.firebaseapp.com",
projectId: "hrmtracker-696e0",
storageBucket: "hrmtracker-696e0.appspot.com",
messagingSenderId: "916301243842",
appId: "1:916301243842:web:000561b75b44979c1ca25b"})
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
  db
}