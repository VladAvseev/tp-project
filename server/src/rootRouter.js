const express = require("express");
const employeeRouter = require("./modules/_employee/router");
const leaveRouter = require("./modules/_leave/router");
const bonusRouter = require("./modules/_bonus/router");

const rootRouter = express.Router();

rootRouter.use("/employee", employeeRouter);
rootRouter.use("/leave", leaveRouter);
rootRouter.use("/bonus", bonusRouter);

module.exports = rootRouter;
