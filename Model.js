import { deepClone } from "./utils/deepClone";
import { EventEmitter } from "./utils/eventEmitter";

export const generatePostModelUtils = () => {
  const eventEmitter = new EventEmitter();
  const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

  let posts = [];

  const fetchPosts = async () => {
    const response = await fetch(POSTS_URL);
    const jsonData = await response.json();
    posts = deepClone(jsonData);
    eventEmitter.emit("change", posts);
  };

  const subscribe = (listener) => {
    eventEmitter.on("change", listener);
    // return (listener) => {
    //   eventEmitter.off("change", listener);
    // }
  };

  return {
    fetchPosts,
    subscribe,
  };
};
