const express = require('express');
const router = express.Router();
let profileController = require('../controllers/profileController');

router.get('/', profileController.main);
router.get('/edit-email', profileController.edit);
router.get('/edit-password', profileController.editPassword);

module.exports = router;
