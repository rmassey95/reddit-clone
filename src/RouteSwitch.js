import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import Subreddit from "./components/Subreddit";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import "./styles/index.css";
import {
  signInUser,
  isUserSignedIn,
  signOutUser,
  db,
} from "./scripts/firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";

const RouteSwitch = () => {
  const [posts, setPosts] = useState([]);

  const getData = () => {
    const data = ref(db, "posts");
    onValue(data, (snapshot) => {
      setPosts(snapshot.val());
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const [loggedIn, setLoggedIn] = useState(isUserSignedIn);

  const signOut = () => {
    signOutUser();
  };

  const signIn = () => {
    signInUser();
  };

  const authStateObserver = (user) => {
    if (user && !loggedIn) {
      setLoggedIn(true);
    } else if (!user && loggedIn) {
      setLoggedIn(false);
    }
  };

  // Initialize firebase auth
  function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  initFirebaseAuth();

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} signOut={signOut} signIn={signIn} />
      <Routes>
        <Route
          path="/"
          element={<Homepage loggedIn={loggedIn} posts={posts} />}
        />
        <Route path="/r" element={<Subreddit />} />
        <Route
          path="/create"
          element={<CreatePost loggedIn={loggedIn} getData={getData} />}
        />
        <Route
          path="/post/:id"
          element={<Post posts={posts} loggedIn={loggedIn} getData={getData} />}
        />
        <Route
          path="/edit/:id"
          element={<EditPost posts={posts} getData={getData} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
