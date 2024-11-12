import { generatePostModelUtils, CurrentPageState } from "./Model";
import { PostView, PaginationView } from "./View";

export const Controller = () => {
  const postModelUtils = generatePostModelUtils();
  const postView = PostView();
  const paginationView = PaginationView();
  const currentPageState = new CurrentPageState();

  const POST_PER_PAGE = 5;
  const PAGINATION_RANGE = 3;

  const findEndPage = async (pageNumber) => {
    let endPage = pageNumber + PAGINATION_RANGE;

    while (endPage > 0) {
      const endPageFistIndex = (endPage - 1) * POST_PER_PAGE + 1;
      const isVaild = await postModelUtils.isValidId(endPageFistIndex);

      if (isVaild) {
        return endPage;
      }

      endPage -= 1;
    }

    return endPage;
  };

  const initApp = async () => {
    const renderPost = (posts) => {
      postView.render(posts);
    };

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
      const endIndex = startIndex + POST_PER_PAGE - 1;

      postModelUtils.fetchPosts(startIndex, endIndex);
    });

    postModelUtils.subscribe(renderPost);

    await postModelUtils.fetchPosts(1, 5);
    renderPagination(1);
  };

  return {
    initApp,
  };
};
