const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const verifyToken = require("../config/verifyToken");

// @desc    Retrieve all posts
// route    GET /api/posts
exports.get_all_posts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().exec();

  if (!posts) {
    return res.status(404).json({ error: "No posts exist." });
  }

  res.json(posts);
});

// @desc    Retrieve post by ID
// route    GET /api/posts/:id
exports.get_post = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findById(postId).populate('author').exec();
  res.json(post);
});

// @desc    Create new post
// route    POST /api/posts
exports.create_post = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const newPost = new Post({
      _id: req.body._id,
      title: req.body.title,
      content: req.body.content,
      img_url: req.body.img_url,
      published: req.body.published,
      comments: req.body.comments,
      author: req.body.author,
      timestamp: req.body.timestamp,
    });
    const existingPost = await Post.findById(req.body._id);

    if (!newPost) {
      return res.status(404).json({ error: "Error while creating post" });
    }

    if (existingPost) {
      return res.status(404).json({ error: "Post already exist" });
    }

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  }),
];

// @desc    Update post by ID
// route    PUT /api/posts/:id
exports.update_post = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;

    const updatedPost = {
      title: req.body.title,
      content: req.body.content,
      img_url: req.body.img_url,
      published: req.body.published,
      comments: req.body.comments,
      author: req.body.author,
      timestamp: req.body.timestamp,
    };

    const post = await Post.findByIdAndUpdate(postId, updatedPost, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post updated successfully", post });
  }),
];

// @desc    Delete post by ID
// route    DELETE /api/posts/:id
exports.delete_post = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findByIdAndDelete(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json({ deleted: 'Post deleted successfully', postId });
})
];