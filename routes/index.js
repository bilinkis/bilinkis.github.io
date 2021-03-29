const express = require('express');
const router = express.Router();
const indexController = ('../controllers/indexController')

router.get('/', indexController.main);

module.exports = router;
