const express = require('express');
const router = express.Router();
const usrerController = ('../controllers/userController')

router.get('/', userController.login);

module.exports = router;
