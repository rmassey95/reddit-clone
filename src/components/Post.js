import { useParams } from "react-router-dom";
import styles from "../styles/Post.module.css";
import { db, addUserToDb } from "../scripts/firebase";
import { ref, set } from "firebase/database";
import uniqid from "uniqid";
import { getUserName, deleteData } from "../scripts/firebase";
import calcTime from "../scripts/timeCalc";
import { useNavigate } from "react-router-dom";
import {
  removeDownvote,
  addUpvote,
  addvoteToPost,
  removeUpvote,
  addDownvote,
} from "../scripts/arrowClicks";

const Post = ({ posts, loggedIn, getData, users, getUsers }) => {
  const params = useParams();
  const postId = params.id;
  let post = {};
  const navigate = useNavigate();

  for (const postKey in posts) {
    if (postKey === postId) {
      post = posts[postKey];
    }
  }

  const eraseTextarea = () => {
    document.getElementById("comment-box").value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    set(ref(db, `posts/${postId}/comments/` + uniqid()), {
      user: getUserName(),
      comment: e.target[0].value,
      commentDate: date.getTime(),
      edit: false,
    });
    eraseTextarea();
    getData();
  };

  const updateComment = (e, commentKey) => {
    e.preventDefault();
    set(ref(db, `posts/${postId}/comments/${commentKey}`), {
      user: post.comments[commentKey].user,
      comment: e.target[0].value,
      commentDate: post.comments[commentKey].commentDate,
      edit: false,
    });
    getData();
  };

  const editComment = (commentKey) => {
    set(ref(db, `posts/${postId}/comments/${commentKey}`), {
      user: post.comments[commentKey].user,
      comment: post.comments[commentKey].comment,
      commentDate: post.comments[commentKey].commentDate,
      edit: true,
    });
    getData();
  };

  const deletePost = (loc) => {
    deleteData(loc);
    navigate("/");
  };

  const checkUser = (user, commentKey) => {
    if (user === getUserName() && !post.comments[commentKey].edit) {
      return (
        <div className={styles.editDeleteContainer}>
          <button
            className={styles.editDeleteBtn}
            onClick={() => {
              editComment(commentKey);
            }}
          >
            Edit
          </button>{" "}
          <button
            className={styles.editDeleteBtn}
            onClick={() => {
              deleteData(`/posts/${postId}/comments/${commentKey}`);
            }}
          >
            Delete
          </button>
        </div>
      );
    }
  };

  const editPost = (postKey) => {
    navigate(`/edit/${postKey}`);
  };

  const checkPostUser = (user) => {
    if (getUserName() !== null && getUserName() === user) {
      return (
        <div className={styles.buttonGroup}>
          <button
            className={styles.contentLinkBtn}
            onClick={() => {
              editPost(postId);
            }}
          >
            Edit
          </button>
          <button
            className={`${styles.contentLinkBtn} ${styles.deleteBtn}`}
            onClick={() => {
              deletePost(`/posts/${postId}`);
            }}
          >
            Delete
          </button>
        </div>
      );
    }
  };

  const downArrowClick = (postKey, indxPos = -1) => {
    if (!users.hasOwnProperty(`${getUserName()}`)) {
      addUserToDb(users);
    }

    if (indxPos !== -1) {
      let upvoteData = users[getUserName()].upvotedPosts;
      removeUpvote(indxPos, upvoteData);
    }

    let userDownvotes = users[getUserName()].downvotedPosts;
    addDownvote(postKey, userDownvotes);

    let updatedPost = {
      ...posts[postKey],
      upvotes: posts[postKey].upvotes - 1,
    };
    addvoteToPost(updatedPost, postKey);

    getData();
    getUsers();
  };

  const upArrowClick = (indxPosOfDownvote = -1) => {
    if (!users.hasOwnProperty(`${getUserName()}`)) {
      addUserToDb(users);
    }

    if (indxPosOfDownvote !== -1) {
      let downvoteData = users[getUserName()].downvotedPosts;
      removeDownvote(indxPosOfDownvote, downvoteData);
    }

    let userUpvotes = users[getUserName()].upvotedPosts;
    addUpvote(postId, userUpvotes);

    let updatedPost = { ...post, upvotes: post.upvotes + 1 };
    addvoteToPost(updatedPost, postId);

    getData();
    getUsers();
  };

  const checkVote = () => {
    if (loggedIn) {
      const username = getUserName();
      let upvoteArray = [];
      let downvoteArray = [];
      let upvoteArrayIndexPos = -1;
      let downvoteArrayIndexPos = -1;

      if (users[username].upvotedPosts[0] !== "null") {
        upvoteArray = Object.values(users[username].upvotedPosts);
      }
      if (users[username].downvotedPosts[0] !== "null") {
        downvoteArray = Object.values(users[username].downvotedPosts);
      }

      upvoteArrayIndexPos = upvoteArray.findIndex(
        (element) => element.post === postId
      );

      if (upvoteArrayIndexPos === -1) {
        downvoteArrayIndexPos = downvoteArray.findIndex(
          (element) => element.post === postId
        );
      }

      if (upvoteArrayIndexPos !== -1) {
        return (
          <div className={styles.upvotes}>
            <button
              className={`${styles.upArrow} ${styles.upSelected}`}
              disabled
            >
              &#8679;
            </button>
            <span>{post.upvotes}</span>
            <button
              className={styles.downArrow}
              onClick={() => {
                downArrowClick(postId, upvoteArrayIndexPos);
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
                upArrowClick(downvoteArrayIndexPos);
              }}
            >
              &#8679;
            </button>
            <span>{post.upvotes}</span>
            <button
              className={`${styles.downArrow} ${styles.downSelected}`}
              disabled
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
                upArrowClick();
              }}
            >
              &#8679;
            </button>
            <span>{post.upvotes}</span>
            <button
              className={styles.downArrow}
              onClick={() => {
                downArrowClick(postId);
              }}
            >
              &#8681;
            </button>
          </div>
        );
      }
    } else {
      return (
        <div className={styles.upvotes}>
          <button className={styles.upArrow} disabled>
            &#8679;
          </button>
          <span>{post.upvotes}</span>
          <button className={styles.downArrow} disabled>
            &#8681;
          </button>
        </div>
      );
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.post}>
        {checkVote()}
        <div className={styles.content}>
          <div className={styles.postInfo}>
            <span
              onClick={() => {
                navigate(`/r/${post.subreddit}`);
              }}
            >
              r/{post.subreddit}
            </span>
            <span className={styles.dot}>&bull;</span>
            <span className={styles.userDate}>
              Posted by {post.user} {calcTime(post.datePosted)}
            </span>
          </div>
          <div className={styles.postTitle}>
            <span>{post.title}</span>
          </div>
          <div className={styles.postContent}>
            <span>{post.content}</span>
          </div>
          {checkPostUser(post.user)}
        </div>
      </div>
      <div className={styles.commentContainer}>
        <div className={styles.comments}>
          <form className={styles.newComment} onSubmit={handleSubmit}>
            <textarea
              id="comment-box"
              className={styles.commentBox}
              placeholder="What are your thoughts?"
            ></textarea>
            {loggedIn ? (
              <button className={styles.commentBtn}>Comment</button>
            ) : (
              <button
                disabled
                className={`${styles.commentBtn} ${styles.disabled}`}
              >
                Comment
              </button>
            )}
          </form>

          {post.comments ? (
            Object.keys(post.comments).map((commentKey) => {
              return (
                <div key={commentKey} className={styles.comment}>
                  <span className={styles.username}>
                    {post.comments[commentKey].user}{" "}
                    <span className={styles.commentDate}>
                      {calcTime(post.comments[commentKey].commentDate)}
                    </span>
                  </span>
                  {post.comments[commentKey].edit ? (
                    <form
                      onSubmit={(e) => {
                        updateComment(e, commentKey);
                      }}
                    >
                      <textarea
                        defaultValue={post.comments[commentKey].comment}
                      ></textarea>
                      <button className={styles.submitBtn}>Submit</button>
                    </form>
                  ) : (
                    <span>{post.comments[commentKey].comment}</span>
                  )}

                  {checkUser(post.comments[commentKey].user, commentKey)}
                </div>
              );
            })
          ) : (
            <div className={styles.comment}>Be the first to comment</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
