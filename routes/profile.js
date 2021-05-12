const express = require('express');
const router = express.Router();
let profileController = require('../controllers/profileController');

router.get('/:id', profileController.main);
router.get('/:id/edit-email', profileController.edit);
router.get('/:id/edit-password', profileController.editPassword);
router.post('/edit', profileController.storeEdit);

module.exports = router;
