const express = require('express');
const router = express.Router();
let userController = require('../controllers/userController');

router.get('/', userController.viewLogin);
router.post('/submit', userController.login);
router.post('/logout', userController.login);

module.exports = router;
