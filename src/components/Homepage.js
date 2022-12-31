import React from "react";
import Navbar from "./Navbar";
import "../styles/Homepage.css";
import hotSymbol from "../assets/top-symbol.png";
import newSymbol from "../assets/new-symbol.png";
import topSymbol from "../assets/top-symbol.png";
import comments from "../assets/comments.png";
import share from "../assets/share.png";

const Homepage = () => {
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
          <div className="post">
            <div className="upvotes">
              <a className="up-arrow" href="/">
                &#8679;
              </a>
              <span>525</span>
              <a className="down-arrow" href="/">
                &#8681;
              </a>
            </div>
            <div className="content">
              <a className="content-enter" href="/post" alt="enter post">
                <div className="post-info">
                  <span>r/subreddit</span>
                  <span className="dot">&bull;</span>
                  <span className="user-date">Posted by USERNAME on DATE</span>
                </div>
                <div className="post-title">
                  <span>Title of the post goes here</span>
                </div>
                <div className="post-content">
                  <span>
                    Text for the inside of the post goes here if there is any.
                  </span>
                </div>
                <div className="post-links">
                  <a className="content-link" href="/comments">
                    <img
                      className="post-link-img"
                      src={comments}
                      alt="comments button"
                    />
                    Comments
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
