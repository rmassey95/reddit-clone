import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/Homepage.css";
import hotSymbol from "../assets/imgs/top-symbol.png";
import newSymbol from "../assets/imgs/new-symbol.png";
import topSymbol from "../assets/imgs/top-symbol.png";
import comments from "../assets/imgs/comments.png";
import share from "../assets/imgs/share.png";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

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

const Homepage = () => {
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
  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="post-container">
          <div className="topbar create-btn-main">
            <div className="create-btn-container">
              <a className="create-btn" href="/create">
                Create Post
              </a>
            </div>
          </div>

          <div className="topbar">
            <div className="topbar-button-container">
              <a className="topbar-button" href="/hot">
                <img
                  className="topbar-symbol"
                  src={hotSymbol}
                  alt="hot symbol"
                />
                Hot
              </a>
            </div>
            <div className="topbar-button-container">
              <a className="topbar-button" href="/new">
                <img
                  className="topbar-symbol"
                  src={newSymbol}
                  alt="new symbol"
                />
                New
              </a>
            </div>
            <div className="topbar-button-container">
              <a className="topbar-button" href="/top">
                <img
                  className="topbar-symbol"
                  src={topSymbol}
                  alt="top symbol"
                />
                Top
              </a>
            </div>
          </div>

          {Object.keys(posts).map((postKey) => {
            return (
              <div className="post" key={postKey}>
                <div className="upvotes">
                  <a className="up-arrow" href="/">
                    &#8679;
                  </a>
                  <span>{posts[postKey].upvotes}</span>
                  <a className="down-arrow" href="/">
                    &#8681;
                  </a>
                </div>
                <div className="content">
                  <div className="post-info">
                    <span>r/{posts[postKey].subreddit}</span>
                    <span className="dot">&bull;</span>
                    <span className="user-date">
                      Posted by {posts[postKey].user} on DATE
                    </span>
                  </div>
                  <div className="post-title">
                    <span>{posts[postKey].title}</span>
                  </div>
                  <div className="post-content">
                    <span>{posts[postKey].content}</span>
                  </div>
                  <div className="post-links">
                    <a className="content-link" href="/comments">
                      <img
                        className="post-link-img"
                        src={comments}
                        alt="comments button"
                      />
                      {Object.keys(posts[postKey].comments).length} Comments
                    </a>
                    <a className="content-link" href="/share">
                      <img
                        className="post-link-img"
                        src={share}
                        alt="share button"
                      />
                      Share
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
