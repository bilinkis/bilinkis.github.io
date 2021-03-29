const express = require('express');
const router = express.Router();
const searchController = ('../controllers/searchController')

router.get('/', searchController.main);

module.exports = router;