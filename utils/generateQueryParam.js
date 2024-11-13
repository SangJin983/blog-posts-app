export const generateQueryParam = (query) =>
  query
    .map((obj) => Object.entries(obj)) // [ [[id, 1]], [[id, 2]], [[id, 3]] ]
    .map(([[key, value]]) => `${key}=${value}`)
    .join("&");
