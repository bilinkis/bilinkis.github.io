let express = require('express');
const indexController = require('../controllers/indexController');
let router = express.Router();


router.get('/', indexController.main);
router.get('/404', indexController.error404);

module.exports = router;
