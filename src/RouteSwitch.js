import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import Subreddit from "./components/Subreddit";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import New from "./components/New";
import Top from "./components/Top";
import "./styles/index.css";
import {
  signInUser,
  isUserSignedIn,
  signOutUser,
  db,
  addUserToDb,
  getUserName,
} from "./scripts/firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";

const RouteSwitch = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  // const getData = async () => {
  //   const db = getFirestore(app);
  //   let data = {};

  //   const querySnapshot = await getDocs(collection(db, "posts"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     data[doc.id] = doc.data();
  //   });
  //   return Promise.resolve(data);
  // };

  const getData = () => {
    const data = ref(db, "posts");

    onValue(data, (snapshot) => {
      setPosts(snapshot.val());
    });
  };

  const getUsers = () => {
    const data = ref(db, "users");
    onValue(data, (snapshot) => {
      setUsers(snapshot.val());
    });
  };

  useEffect(() => {
    // const asyncData = async () => {
    //   try {
    //     let postDataFromDB = await getData();
    //     setPosts(postDataFromDB);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // asyncData();
    getData();
    getUsers();
  }, []);

  const [loggedIn, setLoggedIn] = useState(isUserSignedIn);

  const signOut = () => {
    signOutUser();
  };

  const signIn = () => {
    signInUser();
  };

  useEffect(() => {
    if (!users.hasOwnProperty(`${getUserName()}`)) {
      addUserToDb();
    }
  }, [users]);

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
          element={
            <Homepage
              loggedIn={loggedIn}
              posts={posts}
              getData={getData}
              users={users}
              getUsers={getUsers}
            />
          }
        />
        <Route path="/r" element={<Subreddit />} />
        <Route
          path="/create"
          element={<CreatePost loggedIn={loggedIn} getData={getData} />}
        />
        <Route
          path="/post/:id"
          element={
            <Post
              posts={posts}
              loggedIn={loggedIn}
              getData={getData}
              users={users}
              getUsers={getUsers}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={<EditPost posts={posts} getData={getData} />}
        />
        <Route
          path="/new"
          element={
            <New
              loggedIn={loggedIn}
              posts={posts}
              getData={getData}
              users={users}
              getUsers={getUsers}
            />
          }
        />
        <Route
          path="/top"
          element={
            <Top
              loggedIn={loggedIn}
              posts={posts}
              getData={getData}
              users={users}
              getUsers={getUsers}
            />
          }
        />
        <Route
          path="/r/:id"
          element={
            <Subreddit
              loggedIn={loggedIn}
              posts={posts}
              getData={getData}
              users={users}
              getUsers={getUsers}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
