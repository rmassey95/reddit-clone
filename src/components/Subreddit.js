import Homepage from "./Homepage";
import { useParams } from "react-router-dom";

const Subreddit = ({ loggedIn, posts, getData, users, getUsers }) => {
  const params = useParams();
  const subreddit = params.id;
  let sortedPosts = {};

  Object.keys(posts).forEach((key) => {
    if (posts[key].subreddit === subreddit) {
      sortedPosts[key] = posts[key];
    }
  });

  return (
    <Homepage
      loggedIn={loggedIn}
      posts={sortedPosts}
      getData={getData}
      users={users}
      getUsers={getUsers}
    />
  );
};

export default Subreddit;
