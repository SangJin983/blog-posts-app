export const applyFunctionInRange = (start, end, fn) => {
  if (start == null || end == null || typeof fn !== "function") {
    return;
  }

  for (let i = start; i <= end; i += 1) {
    fn(i)
  }
};
