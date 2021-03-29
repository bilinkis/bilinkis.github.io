const express = require('express');
const router = express.Router();
let productsController = require('../controllers/productController');

router.get('/', productsController.main);
router.get('/add', productsController.add)

module.exports = router;