const express = require('express');
const router = express.Router();
const productsController = ('../controllers/productController')

router.get('/', productsController.main);
router.get('/add', productsController.add)

module.exports = router;