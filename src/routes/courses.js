const express = require('express');
const router = express.Router();

const coursesController = require('../app/controller/CoursesController');
router.get('/create', coursesController.create);
router.post('/store',coursesController.store);
router.post('/handle-form-action',coursesController.handleForm)
router.put('/:id',coursesController.update);
router.patch('/:id/restore',coursesController.restore);
router.delete('/:id',coursesController.delete);
router.delete('/:id/force',coursesController.forcedelete);
router.get('/:slug', coursesController.show);
router.get('/:id/edit',coursesController.edit);
module.exports = router;
