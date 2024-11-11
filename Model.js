import { EventEmitter } from "./utils/eventEmitter";
import { applyFunctionInRange } from "./utils/applyFunctionInRange"

export const generatePostModelUtils = () => {
  const eventEmitter = new EventEmitter();
  const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

  const generateIdrangeQuery = (start, end) => {
    const ids = [];
    
    applyFunctionInRange(start, end, (index) => {
      ids.push(`id=${index}`)
    })

    return ids.join("&");
  };

  const fetchPosts = async (start, end) => {
    const idQuery = generateIdrangeQuery(start, end);
    const response = await fetch(POSTS_URL + "?" + idQuery);
    const jsonData = await response.json();

    eventEmitter.emit("change", jsonData);
  };

  const subscribe = (listener) => {
    eventEmitter.on("change", listener);
    return (listener) => {
      eventEmitter.off("change", listener);
    };
  };

  return {
    fetchPosts,
    subscribe,
  };
};
