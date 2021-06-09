const express = require('express');
const router = express.Router();
let userController = require('../controllers/userController');
var multer = require("multer");
var path = require("path");


//Config multer
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "public/images/users");
    },
    filename: function (req, file, callback) {
      callback(null, "user-" + Date.now() + path.extname(file.originalname));
    },
  });
  var upload = multer({ storage: storage });

router.get('/', userController.viewRegister);
router.post('/store', upload.single('user_file'), userController.store)

module.exports = router;
