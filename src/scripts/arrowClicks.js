import { addToDb, getUserName } from "./firebase";

function removeDownvote(indxPos, downvoteData, username) {
  if (downvoteData.length > 1) {
    downvoteData.splice(indxPos, 1);
    addToDb(`users/${username}/downvotedPosts/`, downvoteData);
  } else {
    addToDb(`users/${username}/downvotedPosts/`, ["null"]);
  }
}

function addDownvote(postKey, userDownvotes) {
  if (userDownvotes[0] === "null") {
    userDownvotes = [{ post: postKey }];
  } else {
    userDownvotes.push({ post: postKey });
  }

  addToDb(`users/${getUserName()}/downvotedPosts/`, userDownvotes);
}

function addUpvote(postKey, userUpvotes) {
  if (userUpvotes[0] === "null") {
    userUpvotes = [{ post: postKey }];
  } else {
    userUpvotes.push({ post: postKey });
  }

  addToDb(`users/${getUserName()}/upvotedPosts/`, userUpvotes);
}

function removeUpvote(indxPos, upvoteData, username) {
  if (upvoteData.length > 1) {
    upvoteData.splice(indxPos, 1);
    addToDb(`users/${username}/upvotedPosts/`, upvoteData);
  } else {
    addToDb(`users/${username}/upvotedPosts/`, ["null"]);
  }
}

function addvoteToPost(updatedPost, postId) {
  addToDb(`posts/${postId}/`, updatedPost);
}

export { removeDownvote, addUpvote, addvoteToPost, removeUpvote, addDownvote };
