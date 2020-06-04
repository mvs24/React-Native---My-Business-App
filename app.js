const express = require("express");
const bodyParser = require("body-parser");

const globalErrorHandler = require("./controllers/globalErrorHandler");
const userRouter = require("./routes/userRoutes");
const businessRouter = require("./routes/businessRoutes");
const clientRouter = require("./routes/clientRoutes");
const AppError = require("./utils/AppError");

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/businesses", businessRouter);
app.use("/api/v1/clients", clientRouter);

app.all("*", (req, res, next) => {
  return next(new AppError("This route is not yet defined!", 404));
});

app.use(globalErrorHandler);

module.exports = app;
