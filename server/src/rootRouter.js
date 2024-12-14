const express = require("express");
const employeeRouter = require("./modules/_employee/router");
const leaveRouter = require("./modules/_leave/router");
const bonusRouter = require("./modules/_bonus/router");
const paymentRouter = require("./modules/_payment/router");

const rootRouter = express.Router();

rootRouter.use("/employee", employeeRouter);
rootRouter.use("/leave", leaveRouter);
rootRouter.use("/bonus", bonusRouter);
rootRouter.use("/payment", paymentRouter);

module.exports = rootRouter;
