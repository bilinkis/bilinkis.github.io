const express = require('express');
const router = express.Router();
let userController = require('../controllers/userController');

router.get('/', userController.register);

module.exports = router;
