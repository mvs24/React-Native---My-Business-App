const AppError = require("../utils/AppError");

const handleDuplicateError = (err) => {
  console.log(err);
  const fields = Object.keys(err.keyPattern).join(". ");

  const message = `Duplicate field value: ${fields}. Please use another value!`;
  return new AppError(message, 400);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Token is invalid! Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const handleValidationError = (err) => {
  // const errors = Object.values(err.errors);
  // const newErr = errors.map((el) => el.message);

  return new AppError(err.message, 400);
};

const sendDevelopmentError = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProductionError = (res, err) => {
  console.log(err.message);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  let msg = err.message;

  if (process.env.NODE_ENV === "development") {
    sendDevelopmentError(res, err);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = msg || "Something went wrong";
    error.status = err.status;
    error.statusCode = err.statusCode;
    error.isOperational = err.isOperational;
    console.log(error);

    if (error.code === 11000) error = handleDuplicateError(error);
    if (error.errors) error = handleValidationError(error);
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    // console.log(error);

    sendProductionError(res, error);
  }
};
