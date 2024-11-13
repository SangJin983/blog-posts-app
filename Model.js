import { EventEmitter } from "./utils/eventEmitter";
import { applyFunctionInRange } from "./utils/applyFunctionInRange";

export class PostModel {
  #POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  #eventEmitter = new EventEmitter();

  #generateIdrangeQuery(start, end) {
    const ids = [];

    applyFunctionInRange(start, end, (index) => {
      ids.push(`id=${index}`);
    });

    return ids.join("&");
  }

  async fetchPosts(start, end) {
    const idQuery = this.#generateIdrangeQuery(start, end);
    const response = await fetch(this.#POSTS_URL + "?" + idQuery);
    const jsonData = await response.json();

    this.#eventEmitter.emit("change", jsonData);
  }

  async isValidId(id) {
    const idQuery = this.#generateIdrangeQuery(id, id);
    const response = await fetch(this.#POSTS_URL + "?" + idQuery);
    const jsonData = await response.json();

    return jsonData.length > 0;
  }

  subscribe(listener) {
    this.#eventEmitter.on("change", listener);
    return (listener) => {
      this.#eventEmitter.off("change", listener);
    };
  }
}

export class CurrentPageState {
  #currentPage;
  #eventEmitter = new EventEmitter();

  setPage(pageNumber) {
    this.#currentPage = pageNumber;
    this.#eventEmitter.emit("change", this.#currentPage);
  }

  subscribe(listener) {
    this.#eventEmitter.on("change", listener);
    return (listener) => {
      this.#eventEmitter.off("change", listener);
    };
  }
}
