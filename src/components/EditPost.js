import { React } from "react";
import styles from "../styles/CreatePost.module.css";
import { db } from "../scripts/firebase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { getUserName } from "../scripts/firebase";
import { useParams } from "react-router-dom";

const EditPost = ({ posts, getData }) => {
  const navigate = useNavigate();

  const params = useParams();
  const postId = params.id;
  let post = {};

  for (const postKey in posts) {
    if (postKey === postId) {
      post = posts[postKey];
    }
  }

  const handleSubmit = (e, post) => {
    e.preventDefault();
    set(ref(db, "posts/" + postId), {
      user: post.user,
      title: e.target[0].value,
      subreddit: e.target[1].value,
      content: e.target[2].value,
      upvotes: post.upvotes,
      datePosted: post.datePosted,
    });
    getData();
    navigate("/");
  };

  const checkUser = (user) => {
    if (user === getUserName()) {
      return true;
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const date = new Date();
  //   set(ref(db, "posts/" + uniqid()), {
  //     user: getUserName(),
  //     title: e.target[0].value,
  //     subreddit: e.target[1].value,
  //     content: e.target[2].value,
  //     upvotes: 0,
  //     datePosted: date.getTime(),
  //   });
  //   getData();
  //   navigate("/");
  // };

  if (checkUser(post.user)) {
    return (
      <div>
        <div className={styles.mainContainer}>
          <h2>Edit Post</h2>
          <form
            className={styles.form}
            onSubmit={(e) => {
              handleSubmit(e, post);
            }}
          >
            <div className={styles.inputDiv}>
              <input
                className={styles.input}
                id="title"
                placeholder="Title"
                defaultValue={post.title}
              />
            </div>
            <div className={styles.inputDiv}>
              <input
                className={styles.input}
                id="subreddit"
                placeholder="Subreddit"
                defaultValue={post.subreddit}
              />
            </div>
            <div className={styles.inputDiv}>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                id="content"
                placeholder="Text"
                defaultValue={post.content}
              />
            </div>
            <div className={styles.submit}>
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.textbox}>
          <span className={styles.mustLoginText}>
            You are not the Owner of this Post
          </span>
        </div>
      </div>
    );
  }
};

export default EditPost;
