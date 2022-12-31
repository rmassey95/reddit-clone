import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/Homepage.css";
import hotSymbol from "../assets/imgs/top-symbol.png";
import newSymbol from "../assets/imgs/new-symbol.png";
import topSymbol from "../assets/imgs/top-symbol.png";
import comments from "../assets/imgs/comments.png";
import share from "../assets/imgs/share.png";
import { db } from "../scripts/firebase";
import { ref, onValue } from "firebase/database";

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

  if (posts) {
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
                        {posts[postKey].comments
                          ? `${
                              Object.keys(posts[postKey].comments).length
                            } Comments`
                          : "Comment"}
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
  }
};

export default Homepage;
