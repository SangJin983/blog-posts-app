export const deepClone = (source) => {
  // null, undefined check
  if (source == null) {
    return null;
  }

  // primitive type
  if (typeof source !== "object") {
    return source;
  }

  // array type
  if (Array.isArray(source)) {
    return source.map((item) => deepClone(item));
  }

  // object type
  const keys = Object.keys(source);
  const result = {};
  for (const key of keys) {
    result[key] = deepClone(source[key]);
  }
  return result;
};
