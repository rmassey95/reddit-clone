import Homepage from "./Homepage";

const Top = ({ loggedIn, posts, getData, users, getUsers }) => {
  const insertionSort = (postsArr) => {
    for (let i = 1; i < postsArr.length; i++) {
      let currentElement = posts[postsArr[i]].datePosted;
      let currentData = posts[postsArr[i]];
      let j = i - 1;
      while (j > -1 && currentElement > posts[postsArr[j]].datePosted) {
        posts[postsArr[j + 1]] = posts[postsArr[j]];
        j--;
      }
      posts[postsArr[j + 1]] = currentData;
    }
  };

  insertionSort(Object.keys(posts));

  return (
    <Homepage
      loggedIn={loggedIn}
      posts={posts}
      getData={getData}
      users={users}
      getUsers={getUsers}
    />
  );
};

export default Top;
