import { EventEmitter } from "./utils/eventEmitter";
import { generateQueryParamWithRange } from "./utils/generateQueryParamWithRange";
import { range } from "./utils/range";
import { timeout } from "./utils/timeout";

export class PostModel {
  #POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  #TIMEOUT_MS = 1000;
  #eventEmitter = new EventEmitter();

  async fetchPosts(start, end) {
    // 패치 요청을 시도할 Promise 객체를 생성
    const fetches = range(start, end).map((id) =>
      timeout(fetch(this.#POSTS_URL + "/" + id), this.#TIMEOUT_MS)
    );
    // 패치 요청에 대한 응답을 기다림
    const responses = await Promise.allSettled(fetches);
    // 패치 요청 성공한 post에 대해 json() 변환을 시도할 Promise 객체를 생성
    const jsonDatas = responses.map((response) => {
      if (response.status === "fulfilled") {
        return response.value.json();
      }
      console.error("Fetch post error:", response.reason);
      return null;
    });
    // 모든 비동기 json()을 처리 후, 배열로 반환
    const result = (await Promise.all(jsonDatas)).filter(
      (data) => data !== null
    );

    this.#eventEmitter.emit("change", result);
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
