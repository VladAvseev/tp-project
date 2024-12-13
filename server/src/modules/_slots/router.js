const controller = require('./controller');
const express = require("express");
const router = express.Router();

router.post("/get_by_date_to_student", controller.getByDateToStudent);
router.post("/get_by_date_to_admin", controller.getByDateToAdmin);
router.post("/get_by_weekday", controller.getByWeekday);
router.post("/delete", controller.delete);
router.post("/create", controller.create);
router.post("/get_place_limit", controller.getPlaceLimit);
router.post("/set_place_limit", controller.setPlaceLimit);

module.exports = router;