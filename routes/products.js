const express = require('express');
const router = express.Router();
let productsController = require('../controllers/productController');

router.get('/:id', productsController.main);
router.get('/', productsController.add);
router.post('/store', productsController.saveProduct);

module.exports = router;