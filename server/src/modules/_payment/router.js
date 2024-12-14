const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.get);
router.post("/get_by_employee", controller.getByEmployee);
router.post("/create", controller.create);
router.post("/delete", controller.delete);

module.exports = router;
