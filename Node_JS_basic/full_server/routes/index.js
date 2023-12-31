import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

const express = require('express');

const router = express.Router();

router.get('/students/:major', StudentsController.getAllStudentsByMajor);
router.get('/students', StudentsController.getAllStudents);
router.get('/', AppController.getHomepage);

module.exports = router;
