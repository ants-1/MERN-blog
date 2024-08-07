const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/authController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

// POST ROUTES

router.get('/posts', post_controller.get_all_posts);

router.get('/posts/:postId', post_controller.get_post);

router.post('/posts', post_controller.create_post);

router.put('/posts/:postId', post_controller.update_post);

router.delete('/posts/:postId', post_controller.delete_post);

// COMMENT ROUTES

router.get('/posts/:postId/comments', comment_controller.get_all_comments);

router.get('/posts/:postId/comments/:commentId', comment_controller.get_comment);

router.post('/posts/:postId/comments', comment_controller.create_comment);

router.put('/posts/:postId/comments/:commentId', comment_controller.update_comment);

router.delete('/posts/:postId/comments/:commentId', comment_controller.delete_comment);

// // USER ROUTES

router.post('/sign-up', auth_controller.sign_up);

router.post('/login', auth_controller.login);

router.get('/logout', auth_controller.logout);

router.get('/profile/:userId', auth_controller.get_profile);

router.put('/profile/:userId', auth_controller.update_profile);

module.exports = router;
