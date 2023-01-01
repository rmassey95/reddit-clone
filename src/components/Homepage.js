import React from "react";
import styles from "../styles/Homepage.module.css";
import hotSymbol from "../assets/imgs/top-symbol.png";
import newSymbol from "../assets/imgs/new-symbol.png";
import topSymbol from "../assets/imgs/top-symbol.png";
import comments from "../assets/imgs/comments.png";
import share from "../assets/imgs/share.png";
import { useNavigate } from "react-router-dom";
import calcTime from "../scripts/timeCalc.js";
import { getUserName } from "../scripts/firebase";

const Homepage = ({ loggedIn, posts }) => {
  const navigate = useNavigate();

  const postClicked = (postKey) => {
    navigate(`/post/${postKey}`);
  };

  const checkUser = (user) => {
    if (getUserName() === user) {
      return (
        <div className={styles.buttonGroup}>
          <button className={styles.contentLinkBtn}>Edit</button>
          <button className={`${styles.contentLinkBtn} ${styles.deleteBtn}`}>
            Delete
          </button>
        </div>
      );
    }
  };

  if (posts) {
    return (
      <div>
        <div className={styles.mainContainer}>
          <div className={styles.postContainer}>
            <div className={`${styles.topbar} ${styles.createBtnMain}`}>
              <div className={styles.createBtnContainer}>
                {loggedIn ? (
                  <a className={styles.createBtn} href="/create">
                    Create Post
                  </a>
                ) : (
                  <span className={styles.loginToCreatePost}>
                    Login to Create a Post
                  </span>
                )}
              </div>
            </div>

            <div className={styles.topbar}>
              <div className={styles.topbarButtonContainer}>
                <a className={styles.topbarButton} href="/hot">
                  <img
                    className={styles.topbarSymbol}
                    src={hotSymbol}
                    alt="hot symbol"
                  />
                  Hot
                </a>
              </div>
              <div className={styles.topbarButtonContainer}>
                <a className={styles.topbarButton} href="/new">
                  <img
                    className={styles.topbarSymbol}
                    src={newSymbol}
                    alt="new symbol"
                  />
                  New
                </a>
              </div>
              <div className={styles.topbarButtonContainer}>
                <a className={styles.topbarButton} href="/top">
                  <img
                    className={styles.topbarSymbol}
                    src={topSymbol}
                    alt="top symbol"
                  />
                  Top
                </a>
              </div>
            </div>

            {Object.keys(posts).map((postKey) => {
              return (
                <div className={styles.post} key={postKey}>
                  <div className={styles.upvotes}>
                    <button className={styles.upArrow}>&#8679;</button>
                    <span>{posts[postKey].upvotes}</span>
                    <button className={styles.downArrow}>&#8681;</button>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.postInfo}>
                      <span>r/{posts[postKey].subreddit}</span>
                      <span className={styles.dot}>&bull;</span>
                      <span className={styles.userDate}>
                        Posted by {posts[postKey].user}{" "}
                        {calcTime(posts[postKey].datePosted)}
                      </span>
                    </div>
                    <div
                      className={styles.postTitle}
                      onClick={() => {
                        postClicked(postKey);
                      }}
                    >
                      <span>{posts[postKey].title}</span>
                    </div>
                    <div
                      className={styles.postContent}
                      onClick={() => {
                        postClicked(postKey);
                      }}
                    >
                      <span>{posts[postKey].content}</span>
                    </div>
                    <div className={styles.postLinks}>
                      <div className={styles.buttonGroup}>
                        <div
                          className={styles.contentLink}
                          onClick={() => {
                            postClicked(postKey);
                          }}
                        >
                          <img
                            className={styles.postLinkImg}
                            src={comments}
                            alt="comments button"
                          />
                          {posts[postKey].comments
                            ? `${
                                Object.keys(posts[postKey].comments).length
                              } Comments`
                            : "Comment"}
                        </div>
                        <a className={styles.contentLink} href="/share">
                          <img
                            className={styles.postLinkImg}
                            src={share}
                            alt="share button"
                          />
                          Share
                        </a>
                      </div>
                      {checkUser(posts[postKey].user)}
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
