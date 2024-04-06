import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkrzndqk8hmagEhUJMSdY4ZQbPj2to59g",
  authDomain: "ai-note-f261b.firebaseapp.com",
  projectId: "ai-note-f261b",
  storageBucket: "ai-note-f261b.appspot.com",
  messagingSenderId: "448845915089",
  appId: "1:448845915089:web:4a190a96040f9cb73f76f0",
  measurementId: "G-D6M5WMNSER"
};

const app = initializeApp(firebaseConfig);
export const storages = getStorage(app);