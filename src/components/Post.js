import { useParams } from "react-router-dom";
import styles from "../styles/Post.module.css";
import { db } from "../scripts/firebase";
import { ref, set } from "firebase/database";
import uniqid from "uniqid";
import { getUserName, deleteData } from "../scripts/firebase";
import calcTime from "../scripts/timeCalc";

const Post = ({ posts, loggedIn, getData }) => {
  const params = useParams();
  const postId = params.id;
  let post = {};

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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.post}>
        <div className={styles.upvotes}>
          <button className={styles.upArrow}>&#8679;</button>
          <span>{post.upvotes}</span>
          <button className={styles.downArrow}>&#8681;</button>
        </div>
        <div className={styles.content}>
          <div className={styles.postInfo}>
            <span>r/{post.subreddit}</span>
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
