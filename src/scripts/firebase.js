import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDDEhfEXVUOnHt1fKaKSk3IhnHrR2QxrQc",
  authDomain: "redditclone-313d8.firebaseapp.com",
  projectId: "redditclone-313d8",
  storageBucket: "redditclone-313d8.appspot.com",
  messagingSenderId: "218973432513",
  appId: "1:218973432513:web:dff5c690ccc8705fa58240",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();

export { db };
