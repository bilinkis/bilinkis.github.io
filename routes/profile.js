const express = require('express');
const router = express.Router();
let profileController = require('../controllers/profileController');

router.get('/', profileController.main);
router.get('/edit', profileController.edit);

module.exports = router;
