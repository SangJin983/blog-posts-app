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

    const renderPagination = (posts) => {
      const totalPages = Math.ceil(posts.length / POST_PER_PAGE);

      paginationView.render(totalPages);
    };

    const changeCurrentPage = (pageNumber) => {
      currentPage = pageNumber;
      postModelUtils.fetchPosts()
    }

    postModelUtils.subscribe(renderPost);
    postModelUtils.subscribe(renderPagination);
    paginationView.subscribe(changeCurrentPage);

    await postModelUtils.fetchPosts();
  };

  return {
    initApp,
  };
};
