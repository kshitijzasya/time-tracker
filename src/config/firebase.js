// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const settings = {timestampsInSnapshots: true};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWWl8pSvQhGC-07C0IAfqlwnrM4O5GI_E",
  authDomain: "hrmtracker-696e0.firebaseapp.com",
  projectId: "hrmtracker-696e0",
  storageBucket: "hrmtracker-696e0.appspot.com",
  messagingSenderId: "916301243842",
  appId: "1:916301243842:web:000561b75b44979c1ca25b"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;