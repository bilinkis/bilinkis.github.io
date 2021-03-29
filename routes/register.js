const express = require('express');
const router = express.Router();
const userController = ('../controllers/userController')

router.get('/', userController.register);

module.exports = router;
