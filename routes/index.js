let express = require('express');
const indexController = require('../controllers/indexController');
let router = express.Router();


router.get('/', indexController.main);

module.exports = router;
