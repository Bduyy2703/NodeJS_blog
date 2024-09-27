const express = require('express');
const router = express.Router();

const meController = require('../app/controller/MeController');
router.get('/stored/Courses', meController.storedCourses);

module.exports = router;
