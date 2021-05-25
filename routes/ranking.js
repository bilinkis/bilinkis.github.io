let express = require('express');
const rankingController = require('../controllers/rankingController');
let router = express.Router();

router.get('/', rankingController.main);


module.exports = router;