const express = require("express");
const bodyParser = require("body-parser");

const globalErrorHandler = require("./controllers/globalErrorHandler");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);

module.exports = app;
