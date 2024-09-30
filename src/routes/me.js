const express = require('express');
const router = express.Router();

const meController = require('../app/controller/MeController');
router.get('/stored/Courses', meController.storedCourses);
router.get('/trash/Courses', meController.trashCourses);

module.exports = router;
