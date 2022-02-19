// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { Firebase } from "./api";

const settings = {timestampsInSnapshots: true};

// Your web app's Firebase configuration
const firebaseConfig = { ...Firebase};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
  db
}