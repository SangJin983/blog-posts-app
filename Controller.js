import { PostModel, CurrentPageState } from "./Model";
import { PostView, PaginationView } from "./View";

export const Controller = () => {
  const postModel = new PostModel();
  const postView = PostView();
  const paginationView = PaginationView();
  const currentPageState = new CurrentPageState();

  const POST_PER_PAGE = 5;
  const PAGINATION_RANGE = 3;

  const findEndPage = async (pageNumber) => {
    let endPage = pageNumber + PAGINATION_RANGE;

    while (endPage > 0) {
      const endPageFirstIndex = (endPage - 1) * POST_PER_PAGE + 1;
      const isVaild = await postModel.isValidId(endPageFirstIndex);

      if (isVaild) {
        return endPage;
      }

      endPage -= 1;
    }

    return endPage;
  };

  const initApp = async () => {
    const renderPagination = async (pageNumber) => {
      const startPage = Math.max(1, pageNumber - PAGINATION_RANGE);
      const endPage = await findEndPage(pageNumber);

      paginationView.render(startPage, endPage);
    };

    paginationView.subscribe((pageNumber) => {
      currentPageState.setPage(pageNumber);
    });

    currentPageState.subscribe((pageNumber) => {
      const startIndex = (pageNumber - 1) * POST_PER_PAGE + 1;
      const endIndex = startIndex + POST_PER_PAGE;

      postModel.fetchPosts(startIndex, endIndex);
    });

    postModel.subscribe((posts) => {
      postView.render(posts);
    });

    await postModel.fetchPosts(1, 6);
    renderPagination(1);
  };

  return {
    initApp,
  };
};
