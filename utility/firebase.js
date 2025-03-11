//Import necessary functions
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI-6o6gqUKMjDVggd91BiJDSxVupsKMv8",
  authDomain: "clone-evangadi.firebaseapp.com",
  projectId: "clone-evangadi",
  storageBucket: "clone-evangadi.appspot.com",
  messagingSenderId: "676500344444",
  appId: "1:676500344444:web:75f6efc6c4ac9fa257c3f9",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);