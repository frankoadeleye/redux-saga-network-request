const myLoggingMiddleware = function ({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      //   console.log(
      //     "%c getState before update 👉 ",
      //     "background:purple;color:white",
      //     getState()
      //   );
      next(action);
      console.log(
        "%c getState after update 👉 ",
        "background:purple;color:white",
        getState()
      );
    };
  };
};

export default myLoggingMiddleware;
