import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove, set } from "firebase/database";
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
const app = initializeApp(firebaseConfig);
const db = getDatabase();

async function signInUser() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function getUserName() {
  if (getAuth().currentUser) {
    return getAuth().currentUser.displayName;
  } else {
    return null;
  }
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

function addUserToDb() {
  let newUser = {};
  newUser = {
    upvotedPosts: ["null"],
    downvotedPosts: ["null"],
  };
  set(ref(db, `users/${getUserName()}`), newUser);
}

function addToDb(path, data) {
  set(ref(db, path), data);
}

export {
  db,
  signInUser,
  isUserSignedIn,
  getUserName,
  signOutUser,
  deleteData,
  addUserToDb,
  addToDb,
  app,
};
