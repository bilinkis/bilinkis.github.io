const express = require('express');
const router = express.Router();
let profileController = require('../controllers/profileController');

router.get('/:id', profileController.main);
router.get('/:id/edit-email', profileController.edit);
router.get('/:id/edit-password', profileController.editPassword);
router.post('/edit-email', profileController.storeEditEmail);
router.post('/edit-password', profileController.storeEditPassword);
router.post('/delete', profileController.delete);
router.post('/follow', profileController.follow)

module.exports = router;
