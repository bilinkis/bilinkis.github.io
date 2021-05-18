const express = require('express');
const router = express.Router();
let productsController = require('../controllers/productController');

router.get('/:id', productsController.main);
router.get('/', productsController.add);
router.post('/store', productsController.saveProduct);
router.get('/:id/edit', productsController.edit);
router.post('/edit', productsController.storeEdit);
router.post('/delete', productsController.delete);

module.exports = router; 