export const timeout = async (promise, ms) => {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject({reason: "it's too late!"}), ms)
  );

  return await Promise.race([promise, timeoutPromise]);
};
