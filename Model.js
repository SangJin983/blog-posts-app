import { deepClone } from "./utils/deepClone";

export const PostModel = () => {
  const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  let posts = [];

  const fetchPosts = async () => {
    const response = await fetch(POSTS_URL);
    const jsonData = await response.json();
    posts = deepClone(jsonData);
  };

  /* set은 이제 아마도 서버에 보내는 방식일텐데.
   대신 이제 try-catch로 구현해야 될 것 같은? */

  const getPosts = () => posts;

  return {
    fetchPosts,
    getPosts,
  };
};
