const express = require("express");
const employeeRouter = require("./modules/_employee/router");

const rootRouter = express.Router();

rootRouter.use("/employee", employeeRouter);

module.exports = rootRouter;
