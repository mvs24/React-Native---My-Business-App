const express = require("express");
const bodyParser = require("body-parser");

const globalErrorHandler = require("./controllers/globalErrorHandler");
const userRouter = require("./routes/userRoutes");
const businessRouter = require("./routes/businessRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/businesses", businessRouter);

app.use(globalErrorHandler);

module.exports = app;
