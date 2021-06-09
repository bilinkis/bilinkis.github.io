const express = require('express');
const router = express.Router();
let productsController = require('../controllers/productController');
var multer = require("multer");
var path = require("path");


//Config de multer
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      
              callback(null, 'public/images/products');
          },
    filename: function (req, file, callback) {
      callback(null,  'product-' + Date.now() + path.extname(file.originalname));
    }
  });
  var upload = multer({ storage : storage})

router.get('/:id', productsController.main);
router.get('/', productsController.add);
router.post('/store', upload.single('product_file'), productsController.saveProduct);
router.get('/:id/edit', productsController.edit);
router.post('/edit', upload.single('product_file'), productsController.storeEdit);
router.post('/delete', productsController.delete);


module.exports = router; 