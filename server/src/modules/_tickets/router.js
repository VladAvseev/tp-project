const controller = require('./controller');
const express = require("express");
const router = express.Router();

router.post("/get_by_user", controller.getByUser);
router.post("/get_by_admin", controller.getByAdmin);
router.post("/create", controller.create);
router.post("/cancel_by_user", controller.cancelByUser);
router.post("/cancel_by_admin", controller.cancelByAdmin);
router.post("/accept_by_admin", controller.acceptByAdmin);

module.exports = router;