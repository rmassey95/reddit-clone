import Homepage from "./Homepage";

const New = ({ loggedIn, posts, getData, users, getUsers }) => {
  const insertionSort = (postsArr, newPostOrder) => {
    for (let i = 1; i < postsArr.length; i++) {
      let currentElement = posts[postsArr[i]].datePosted;
      let currentData = postsArr[i];
      let j = i - 1;
      while (j > -1 && currentElement > posts[postsArr[j]].datePosted) {
        postsArr[j + 1] = postsArr[j];
        j--;
      }
      postsArr[j + 1] = currentData;
    }

    if (postsArr.length > 0) {
      for (let i = 0; i < postsArr.length; i++) {
        newPostOrder[postsArr[i]] = posts[postsArr[i]];
      }
    }
  };
  let newPostOrder = {};
  insertionSort(Object.keys(posts), newPostOrder);

  return (
    <Homepage
      loggedIn={loggedIn}
      posts={newPostOrder}
      getData={getData}
      users={users}
      getUsers={getUsers}
    />
  );
};

export default New;
