var express = require('express');
var router = express.Router();
var courseController = require("../controllers/coursesController")

router.post("/:user_id", courseController.addCourses)

router.get("/:user_id", courseController.allCourses)

router.get("/one/:_id", courseController.aCourse)

router.put("/:_id", courseController.updateCourse)

router.delete("/:_id", courseController.deleteCourse)

router.put("/important/:_id", courseController.makeImportant)

router.put("/finish/:_id", courseController.makeFinish)

router.put("/progress/:_id", courseController.makeProgress)

router.get("/progress/:user_id", courseController.coursesProgress)

router.get("/finish/:user_id", courseController.coursesFinish)

module.exports = router