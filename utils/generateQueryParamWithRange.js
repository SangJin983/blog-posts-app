import { range } from "./range";
import { generateQueryParam } from "./generateQueryParam";

export const generateQueryParamWithRange = (start, end) => {
  const toBeFetchedIndexRange = range(start, end).map((index) => {
    return { id: index };
  });

  return generateQueryParam(toBeFetchedIndexRange);
};
