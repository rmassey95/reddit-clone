import { React } from "react";
import Navbar from "./Navbar";
import "../styles/CreatePost.css";
import { db } from "../scripts/firebase";
import { ref, set } from "firebase/database";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    set(ref(db, "posts/" + uniqid()), {
      user: "Ryan",
      title: e.target[0].value,
      subreddit: e.target[1].value,
      content: e.target[2].value,
      upvotes: 0,
    });
    navigate("/");
  };

  return (
    <div>
      <Navbar />

      <div className="main-container">
        <h2>Create a Post</h2>
        <form
          className="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="input-div">
            <input className="input" id="title" placeholder="Title" />
          </div>
          <div className="input-div">
            <input className="input" id="subreddit" placeholder="Subreddit" />
          </div>
          <div className="input-div">
            <textarea
              className="input textarea"
              id="content"
              placeholder="Text"
            />
          </div>
          <div className="submit">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
