let express = require('express');
const commentsController = require('../controllers/commentsController');
let router = express.Router();


router.post('/add', commentsController.save);

module.exports = router;