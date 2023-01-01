import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Homepage from "./components/Homepage";
import Subreddit from "./components/Subreddit";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import "./styles/index.css";
import { signInUser, isUserSignedIn, signOutUser } from "./scripts/firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const RouteSwitch = () => {
  const [loggedIn, setLoggedIn] = useState(isUserSignedIn);

  const signOut = () => {
    signOutUser();
  };

  const signIn = () => {
    signInUser();
  };

  const authStateObserver = (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  // Initialize firebase auth
  function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  initFirebaseAuth();

  console.log(loggedIn);

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} signOut={signOut} signIn={signIn} />
      <Routes>
        <Route path="/" element={<Homepage loggedIn={loggedIn} />} />
        <Route path="/r" element={<Subreddit />} />
        <Route path="/create" element={<CreatePost loggedIn={loggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
