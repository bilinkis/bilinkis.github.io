const express = require('express');
const router = express.Router();
let productsController = require('../controllers/productController');

router.get('/:id', productsController.main);
router.get('/add', productsController.add)

module.exports = router;