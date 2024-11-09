import { generatePostModelUtils } from "./Model";
import { PostView, PaginationView } from "./View";

export const Controller = () => {
  const postModelUtils = generatePostModelUtils();
  const postView = PostView();
  const paginationView = PaginationView();

  const POST_PER_PAGE = 5;
  let currentPage = 1;

  const initApp = async () => {
    const renderPost = (posts) => {
      const startIndex = (currentPage - 1) * POST_PER_PAGE;
      const endIndex = startIndex + POST_PER_PAGE;
      const paginatedPosts = posts.slice(startIndex, endIndex);

      postView.render(paginatedPosts);
    };

    postModelUtils.subscribe(renderPost);
    await postModelUtils.fetchPosts();
    // renderPost();
    // renderPagination();
    // addPaginationEventListener();
  };

  const renderPost = () => {
    const posts = postModel();
    const startIndex = (currentPage - 1) * POST_PER_PAGE;
    const endIndex = startIndex + POST_PER_PAGE;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    postView.render(paginatedPosts);
  };

  // const renderPagination = () => {
  //   const posts = postModel();
  //   const totalPages = Math.ceil(posts.length / POST_PER_PAGE);

  //   paginationView.render(totalPages);
  // };

  // const addPaginationEventListener = () => {
  //   const paginationContainerElement = document.querySelector(
  //     ".pagination-container"
  //   );

  //   paginationContainerElement.addEventListener("click", (event) => {
  //     currentPage = Number(event.target.textContent);
  //     renderPost();
  //   });
  // };

  return {
    initApp,
  };
};
