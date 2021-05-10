const express = require('express');
const router = express.Router();
let userController = require('../controllers/userController');

router.get('/', userController.viewRegister);
router.post('/store', userController.store)

module.exports = router;
