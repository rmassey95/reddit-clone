import React from "react";
import styles from "../styles/Homepage.module.css";
import hotSymbol from "../assets/imgs/top-symbol.png";
import newSymbol from "../assets/imgs/new-symbol.png";
import topSymbol from "../assets/imgs/top-symbol.png";
import comments from "../assets/imgs/comments.png";
import share from "../assets/imgs/share.png";
import { useNavigate } from "react-router-dom";
import calcTime from "../scripts/timeCalc.js";
import { getUserName, deleteData } from "../scripts/firebase";
import { db } from "../scripts/firebase";
import { ref, set } from "firebase/database";

const Homepage = ({ loggedIn, posts, getData, users }) => {
  const navigate = useNavigate();

  const postClicked = (postKey) => {
    navigate(`/post/${postKey}`);
  };

  const editPost = (postKey) => {
    navigate(`/edit/${postKey}`);
  };

  const checkUser = (user, postKey) => {
    if (getUserName() !== null && getUserName === user) {
      return (
        <div className={styles.buttonGroup}>
          <button
            className={styles.contentLinkBtn}
            onClick={() => {
              editPost(postKey);
            }}
          >
            Edit
          </button>
          <button
            className={`${styles.contentLinkBtn} ${styles.deleteBtn}`}
            onClick={() => {
              deleteData(`/posts/${postKey}`);
            }}
          >
            Delete
          </button>
        </div>
      );
    }
  };

  const upArrowClick = (postKey, indxPos = -1) => {
    if (indxPos !== -1) {
      if (Object.values(users[getUserName()].downvotedPosts).length > 1) {
        deleteData(`users/${getUserName()}/downvotedPosts/${indxPos}`);
      } else {
        set(ref(db, `users/${getUserName()}/downvotedPosts/`), "null");
      }
    }

    let userData = users[getUserName()].upvotedPosts;
    if (userData === "null") {
      userData = [{ post: postKey }];
    } else {
      userData = userData.concat({ post: postKey });
    }

    set(ref(db, `users/${getUserName()}/upvotedPosts/`), userData);

    set(ref(db, `posts/${postKey}/`), {
      ...posts[postKey],
      upvotes: posts[postKey].upvotes + 1,
    });
    getData();
  };

  const downArrowClick = (postKey, indxPos = -1) => {
    if (indxPos !== -1) {
      if (Object.values(users[getUserName()].upvotedPosts).length > 1) {
        deleteData(`users/${getUserName()}/upvotedPosts/${indxPos}`);
      } else {
        set(ref(db, `users/${getUserName()}/upvotedPosts/`), "null");
      }
    }

    let userData = users[getUserName()].downvotedPosts;
    if (userData === "null") {
      userData = [{ post: postKey }];
    } else {
      userData = userData.concat({ post: postKey });
    }

    set(ref(db, `users/${getUserName()}/downvotedPosts/`), userData);

    set(ref(db, `posts/${postKey}/`), {
      ...posts[postKey],
      upvotes: posts[postKey].upvotes - 1,
    });
    getData();
  };

  const checkVoteStatus = (postKey) => {
    const username = getUserName();

    let upvoteArray = [];
    let downvoteArray = [];
    let upvoteArrayIndexPos = -1;
    let downvoteArrayIndexPos = -1;

    if (users[username].upvotedPosts != null) {
      upvoteArray = Object.values(users[username].upvotedPosts);
    }
    if (users[username].downvotedPosts != null) {
      downvoteArray = Object.values(users[username].downvotedPosts);
    }

    upvoteArrayIndexPos = upvoteArray.findIndex(
      (element) => element.post === postKey
    );

    if (upvoteArrayIndexPos === -1) {
      downvoteArrayIndexPos = downvoteArray.findIndex(
        (element) => element.post === postKey
      );
    }

    if (upvoteArrayIndexPos !== -1) {
      return (
        <div className={styles.upvotes}>
          <button className={`${styles.upArrow} ${styles.upSelected}`} disabled>
            &#8679;
          </button>
          <span>{posts[postKey].upvotes}</span>
          <button
            className={styles.downArrow}
            onClick={() => {
              downArrowClick(postKey, upvoteArrayIndexPos);
            }}
          >
            &#8681;
          </button>
        </div>
      );
    } else if (downvoteArrayIndexPos !== -1) {
      return (
        <div className={styles.upvotes}>
          <button
            className={styles.upArrow}
            onClick={() => {
              upArrowClick(postKey, downvoteArrayIndexPos);
            }}
          >
            &#8679;
          </button>
          <span>{posts[postKey].upvotes}</span>
          <button
            disabled
            className={`${styles.downArrow} ${styles.downSelected}`}
          >
            &#8681;
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.upvotes}>
          <button
            className={styles.upArrow}
            onClick={() => {
              upArrowClick(postKey);
            }}
          >
            &#8679;
          </button>
          <span>{posts[postKey].upvotes}</span>
          <button
            className={styles.downArrow}
            onClick={() => {
              downArrowClick(postKey);
            }}
          >
            &#8681;
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
                  {getUserName() ? (
                    checkVoteStatus(postKey)
                  ) : (
                    <div className={styles.upvotes}>
                      <button
                        disabled
                        className={styles.upArrow}
                        onClick={() => {
                          upArrowClick(postKey);
                        }}
                      >
                        &#8679;
                      </button>
                      <span>{posts[postKey].upvotes}</span>
                      <button
                        disabled
                        className={styles.downArrow}
                        onClick={() => {
                          downArrowClick(postKey);
                        }}
                      >
                        &#8681;
                      </button>
                    </div>
                  )}

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
                      {checkUser(posts[postKey].user, postKey)}
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
