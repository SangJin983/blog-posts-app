import { EventEmitter } from "./utils/eventEmitter";
import { generateQueryParamWithRange } from "./utils/generateQueryParamWithRange";
import { range } from "./utils/range";

export class PostModel {
  #POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  #eventEmitter = new EventEmitter();

  async fetchPosts(start, end) {
    const queryParam = generateQueryParamWithRange(start, end)
    const response = await fetch(this.#POSTS_URL + "?" + queryParam);
    const jsonData = await response.json();

    this.#eventEmitter.emit("change", jsonData);
  }

  async isValidId(id) {
    const queryParam = generateQueryParamWithRange(id, id + 1);
    const response = await fetch(this.#POSTS_URL + "?" + queryParam);
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

export class CurrentPaginationState {
  #currentPaginationState;
  #eventEmitter = new EventEmitter();

  setRange(start, end) {
    this.#currentPaginationState = range(start, end);
    this.#eventEmitter.emit("change", this.#currentPaginationState);
  }

  subscribe(listener) {
    this.#eventEmitter.on("change", listener);
    return (listener) => {
      this.#eventEmitter.off("change", listener);
    };
  }
}