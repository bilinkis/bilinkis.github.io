const express = require('express');
const router = express.Router();
const profileController = ('../controllers/profileController')

router.get('/', profileController.main);
router.get('/edit', profileController.edit);

module.exports = router;
