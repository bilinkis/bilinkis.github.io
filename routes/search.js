const express = require('express');
const router = express.Router();
let searchController = require('../controllers/searchController');

router.get('/', searchController.main);

module.exports = router;