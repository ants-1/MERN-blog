const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const verifyToken = require("../config/verifyToken");

// @desc  Retrieve all comments by post
// route  GET /api/posts/:postId/comments
exports.get_all_comments = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findById(postId).populate({
    path: 'comments',
    populate: {
      path: 'author',
      model: 'User',
      select: 'username' // Only fetch the username field
    }
  }).exec();
  const comments = post.comments;

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (!comments || comments.length === 0) {
    return res.status(404).json({ error: "Comments not found" });
  }

  res.json(comments);
});

// @desc  Retrieve comment for post by comment ID
// route  GET /api/posts/:postId/comments/:commentId
exports.get_comment = asyncHandler(async (req, res, next) => {
  const { postId, commentId } = req.params;
  const post = await Post.findById(postId).exec();
  const comment = await Comment.findById(commentId).exec();

  if (!post) {
    return res.status(404).json({ error: `Post: ${postId} not found` });
  }

  if (!comment) {
    return res.status(404).json({ error: `Comment: ${commentId} not found` });
  }

  res.json(comment);
});

// @desc  Create new comment for post
// route  POST /api/posts/:postId/comments
exports.create_comment = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const post = await Post.findById(postId).exec();

    if (!post) {
      return res.status(404).json({ error: `Post: ${postId} not found` });
    }

    const newComment = new Comment({
      _id: req.body._id,
      author: req.body.author,
      timestamp: req.body.timestamp,
      text: req.body.text,
    });

    post.comments.push(newComment._id);
    console.log(post.comments);
    await newComment.save();
    await post.save();

    res.status(201).json({ message: 'Comment created.', newComment});
  }),
];

// @desc  Update existing comment for post by comment ID
// route  PUT /api/posts/:postId/comments/:commentId
exports.update_comment = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId).exec();
    const comment = await Comment.findById(commentId).exec();

    if (!post) {
      return res.status(404).json({ error: `Post: ${postId} not found` });
    }

    if (!comment) {
      return res.status(404).json({ error: `Comment: ${commentId} not found` });
    }

    const updatedComment = new Comment({
      _id: commentId,
      author: req.body.author,
      timestamp: req.body.timestamp,
      text: req.body.text,
    });

    await Comment.findByIdAndUpdate(commentId, updatedComment, { new: true });

    res.json({ message: 'Comment updated.', updatedComment});
  }),
];

// @desc  Delete existing comment for post by comment ID
// route  DELETE  /api/posts/:postId/comments/:commentId
exports.delete_comment = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId).exec();
    const comment = await Comment.findById(commentId).exec();

    if (!post) {
      return res.status(404).json({ error: `Post: ${postId} not found` });
    }

    if (!comment) {
      return res.status(404).json({ error: `Comment: ${commentId} not found` });
    }

    post.comments.filter((comment) => comment !== commentId);
    console.log(post.comments);
    await Comment.findByIdAndDelete(commentId).exec();

    res.json({ deleted: 'Comment successfully deleted', postId });
  }),
];
