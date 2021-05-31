const express = require('express');
const router = express.Router();
let profileController = require('../controllers/profileController');

router.get('/:id', profileController.main);
router.get('/:id/edit-email', profileController.edit);
router.get('/:id/edit-password', profileController.editPassword);
router.get('/:id/followers',profileController.followers);
router.get('/:id/following',profileController.following);
router.get('/:id/commentsreceived', profileController.commentsReceived);
router.get('/:id/comments', profileController.commentsReceived);
router.post('/edit-email', profileController.storeEditEmail);
router.post('/edit-password', profileController.storeEditPassword);
router.post('/delete', profileController.delete);
router.post('/follow', profileController.follow);
router.post('/unfollow',profileController.unfollow);

module.exports = router;
