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
  const paginationContainerElement = document.querySelector(
    ".pagination-container"
  );

  const createElement = (index) => {
    const pageButtonElement = document.createElement("button");
    pageButtonElement.className = "pagination-button";
    pageButtonElement.textContent = index;

    return pageButtonElement;
  };

  const render = (totalPages) => {
    paginationContainerElement.innerHTML = "";
    for (let i = 1; i <= totalPages; i += 1) {
      const pageButton = createElement(i);
      paginationContainerElement.append(pageButton);
    }
  };

  return {
    render,
  };
};
