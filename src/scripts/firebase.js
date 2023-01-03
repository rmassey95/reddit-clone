import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove, set } from "firebase/database";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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
