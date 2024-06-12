const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Retrieve all posts
// route    GET /api/posts
exports.get_posts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find().exec();
    res.json(posts);
});

// @desc    Retrieve post by ID
// route    GET /api/posts/:id
exports.get_post = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const post = await Post.findById(postId).exec();
    res.json(post);
});

// @desc    Create new post
// route    POST /api/posts
exports.create_post = asyncHandler(async (req, res, next) => {
    // Code to create a new post...
    res.json(req.body);
});

// @desc    Update post by ID
// route    PUT /api/posts/:id
exports.update_post = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    // Code to update existing post...
    res.json(req.body);
});

// @desc    Delete post by ID
// route    DELETE /api/posts/:id
exports.delete_post = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    // Code to delete existing post...
    res.json({ deleted: postId });
})