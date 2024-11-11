import { generatePostModelUtils } from "./Model";
import { PostView, PaginationView } from "./View";

export const Controller = () => {
  const postModelUtils = generatePostModelUtils();
  const postView = PostView();
  const paginationView = PaginationView();

  const POST_PER_PAGE = 5;

  const initApp = async () => {
    const renderPost = (posts) => {
      postView.render(posts);
    };

    const renderPagination = () => {
      const totalPages = 20;

      paginationView.render(totalPages);
    };

    const changeCurrentPage = (pageNumber) => {
      const startIndex = (pageNumber - 1) * POST_PER_PAGE + 1;
      const endIndex = startIndex + POST_PER_PAGE;

      postModelUtils.fetchPosts(startIndex, endIndex);
    };

    postModelUtils.subscribe(renderPost);
    postModelUtils.subscribe(renderPagination);
    paginationView.subscribe(changeCurrentPage);

    await postModelUtils.fetchPosts(1, 5);
  };

  return {
    initApp,
  };
};
