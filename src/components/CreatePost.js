import { React } from "react";
import styles from "../styles/CreatePost.module.css";
import { db } from "../scripts/firebase";
import { ref, set } from "firebase/database";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";
import { getUserName } from "../scripts/firebase";

const CreatePost = ({ loggedIn, getData }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    set(ref(db, "posts/" + uniqid()), {
      user: getUserName(),
      title: e.target[0].value,
      subreddit: e.target[1].value,
      content: e.target[2].value,
      upvotes: 0,
      datePosted: date.getTime(),
      comments: null,
    });
    getData();
    navigate("/");
  };

  if (loggedIn) {
    return (
      <div>
        <div className={styles.mainContainer}>
          <h2>Create a Post</h2>
          <form
            className={styles.form}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className={styles.inputDiv}>
              <input className={styles.input} id="title" placeholder="Title" />
            </div>
            <div className={styles.inputDiv}>
              <input
                className={styles.input}
                id="subreddit"
                placeholder="Subreddit"
              />
            </div>
            <div className={styles.inputDiv}>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                id="content"
                placeholder="Text"
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
            You Must Login First to Create a Post
          </span>
        </div>
      </div>
    );
  }
};

export default CreatePost;
