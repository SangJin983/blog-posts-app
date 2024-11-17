import { PostModel, CurrentPageState, CurrentPaginationRange } from "./Model";
import { PostView, PaginationView } from "./View";

export const Controller = () => {
  const postModel = new PostModel();
  const postView = PostView();
  const paginationView = PaginationView();
  const currentPageState = new CurrentPageState();
  const currentPaginationRange = new CurrentPaginationRange();

  const POST_PER_PAGE = 5;
  const PAGINATION_RANGE = 3;

  const findEndPage = async (pageNumber) => {
    // 페이지넘버에 따라, 페이지네이션의 마지막 페이지를 초기화
    const endPage = pageNumber + PAGINATION_RANGE;

    if (endPage < 2) {
      return 2;
    }

    // 초기화한 마지막 페이지의 첫번째 post가 유효한지 확인
    const endPageFirstIndex = (endPage - 1) * POST_PER_PAGE + 1;
    const isVaild = await postModel.isValidId(endPageFirstIndex);

    if (isVaild) {
      return endPage;
    }

    // 초기화한 마지막 페이지가 유효하지 않을 경우, 페이지넘버를 1 줄여서 재귀탐색
    return findEndPage(pageNumber - 1);
  };

  const initApp = () => {
    const updatePosts = (pageNumber) => {
      const startIndex = (pageNumber - 1) * POST_PER_PAGE + 1;
      const endIndex = startIndex + POST_PER_PAGE;
      postModel.fetchPosts(startIndex, endIndex);
    };

    const updatePaginationRange = async (pageNumber) => {
      const startPage = Math.max(1, pageNumber - PAGINATION_RANGE);
      const endPage = (await findEndPage(pageNumber)) + 1;
      currentPaginationRange.setRange(startPage, endPage);
    };

    paginationView.subscribe((pageNumber) => {
      currentPageState.setPage(pageNumber);
    });

    currentPageState.subscribe((pageNumber) => {
      updatePosts(pageNumber);
      updatePaginationRange(pageNumber);
    });

    postModel.subscribe((posts) => {
      postView.render(posts);
    });

    currentPaginationRange.subscribe((pageRange) => {
      paginationView.render(pageRange);
    });

    currentPageState.setPage(1);
  };

  return {
    initApp,
  };
};
