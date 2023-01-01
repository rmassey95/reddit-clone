import { useParams } from "react-router-dom";
import styles from "../styles/Post.module.css";
import { db } from "../scripts/firebase";
import { ref, set } from "firebase/database";
import uniqid from "uniqid";
import { getUserName } from "../scripts/firebase";

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
    console.log(e.target[0].value);
    set(ref(db, `posts/${postId}/comments/` + uniqid()), {
      user: getUserName(),
      comment: e.target[0].value,
    });
    eraseTextarea();
    getData();
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
              Posted by {post.user} on DATE
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

          {Object.keys(post.comments).map((commentKey) => {
            return (
              <div key={commentKey} className={styles.comment}>
                <span className={styles.username}>
                  {post.comments[commentKey].user}
                </span>
                <span>{post.comments[commentKey].comment}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
