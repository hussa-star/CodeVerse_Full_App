// ASYNC HANDLER WRAPPER
// This removes try/catch repetition in controllers.

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default asyncHandler;
