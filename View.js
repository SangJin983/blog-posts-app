import { EventEmitter } from "./utils/eventEmitter";

export const PostView = () => {
  const postContainerElement = document.querySelector(".post-container");

  const createElement = (post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";

    const postInfoElement = document.createElement("div");
    postInfoElement.className = "post-Info";

    const postNumberElement = document.createElement("div");
    postNumberElement.textContent = `No. ${post.id}`;

    const postUserIdElement = document.createElement("div");
    postUserIdElement.textContent = `User: ${post.userId}`;

    const postTitleElement = document.createElement("div");
    postTitleElement.className = "post-title";
    postTitleElement.textContent = post.title;

    const postBodyElement = document.createElement("div");
    postBodyElement.className = "post-body";
    postBodyElement.textContent = post.body;

    postInfoElement.append(postNumberElement);
    postInfoElement.append(postUserIdElement);

    postElement.append(postInfoElement);
    postElement.append(postTitleElement);
    postElement.append(postBodyElement);

    return postElement;
  };

  const render = (posts) => {
    postContainerElement.innerHTML = "";
    posts.forEach((post) => {
      const postElement = createElement(post);
      postContainerElement.append(postElement);
    });
  };

  return {
    render,
  };
};

export const PaginationView = () => {
  const eventEmitter = new EventEmitter();
  const paginationContainerElement = document.querySelector(
    ".pagination-container"
  );

  const createElement = (index) => {
    const pageButtonElement = document.createElement("button");
    pageButtonElement.className = "pagination-button";
    pageButtonElement.textContent = index;
    pageButtonElement.setAttribute("data-page", index);

    return pageButtonElement;
  };

  // 페이지네이션 버튼 클릭시, 페이지넘버 변경요구를 알림
  paginationContainerElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("pagination-button")) {
      const pageNumber = Number(event.target.textContent);
      eventEmitter.emit("change", pageNumber);
    }
  });

  const render = (pageRange) => {
    paginationContainerElement.innerHTML = "";
    pageRange.forEach((index) => {
      const pageButtons = createElement(index);
      paginationContainerElement.append(pageButtons);
    });
  };

  const highlight = (currentpage) => {
    const activeButtonElement = document.querySelector(
      `.pagination-button[data-page="${currentpage}"]`
    );

    activeButtonElement.classList.add("active");
  };

  const subscribe = (listener) => {
    eventEmitter.on("change", listener);
    return (listener) => {
      eventEmitter.off("change", listener);
    };
  };

  return {
    render,
    highlight,
    subscribe,
  };
};
