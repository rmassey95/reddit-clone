import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";

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

async function signInUser() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function getUserName() {
  return getAuth().currentUser.displayName;
}

function isUserSignedIn() {
  return !!getAuth().currentUser;
}

function signOutUser() {
  signOut(getAuth());
}

function deleteData(dataPath) {
  remove(ref(db, dataPath));
}

export { db, signInUser, isUserSignedIn, getUserName, signOutUser, deleteData };
