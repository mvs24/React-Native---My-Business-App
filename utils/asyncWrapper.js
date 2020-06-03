const asyncWrapper = (asyncFn) => (req, res, next) => {
  asyncFn(req, res, next).catch(next);
};

module.exports = asyncWrapper;
