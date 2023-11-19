export const forceWait = (time) => {
  return new Promise((resolve) => {
    console.log('실행!');
    setTimeout(() => {
      resolve();
    }, time);
  });
};
