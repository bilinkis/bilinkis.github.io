let express = require('express');
const commentsController = require('../controllers/commentsController');
let router = express.Router();


router.post('/add', commentsController.save);
router.post('/delete', commentsController.delete);

module.exports = router;