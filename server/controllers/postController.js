const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    return res.status(403).json({ message: "Unauth access" });
  }
};


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
  const post = await Post.findById(postId).exec();
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
      return res.status(404).json({ error: "Error while creating post"});
    }

    if (existingPost) {
      return res.status(404).json({ error: "Post already exist"});
    }

    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        return res.status(403);
      } else {
        res.json({
          message: 'Post created...',
          authData
        })
      }
    });

    await newPost.save();

    res.json(req.json);
  }),
];

// @desc    Update post by ID
// route    PUT /api/posts/:id
exports.update_post = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const updatedPost = {
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    img_url: req.body.img_url,
    published: req.body.published,
    comments: req.body.comments,
    author: req.body.author,
    timestamp: req.body.timestamp,
  };

  await Post.findByIdAndUpdate(postId, updatedPost, { new: true });

  res.json(req.body);
});

// @desc    Delete post by ID
// route    DELETE /api/posts/:id
exports.delete_post = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  await Post.findByIdAndDelete(postId);

  res.json({ deleted: postId });
});