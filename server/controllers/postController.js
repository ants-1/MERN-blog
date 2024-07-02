const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const verifyToken = require("../config/verifyToken");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require('dotenv').config();

const upload = multer({ dest: "./public/data/uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImageCloudinary = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
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
  const post = await Post.findById(postId).populate('author').exec();
  res.json(post);
});

// @desc    Create new post
// route    POST /api/posts
exports.create_post = [
  verifyToken,
  upload.single("img_url"),
  asyncHandler(async (req, res, next) => {
    console.log(`File: ${JSON.stringify(req.file, null, 2)})`);
    console.log(`Body: ${JSON.stringify(req.body, null, 2)})`);
    console.log(`Img: ${JSON.stringify(req.img_url, null, 2)})`);
    console.log(`Img: ${JSON.stringify(req.file.img_url, null, 2)})`);
    
    let imageUrl = '';
    if (req.file) {
      try {
        const result = await uploadImageCloudinary(req.file.path);
        console.log(`result: ${result}`);
        imageUrl = result;
      } catch (error) {
        return res.status(500).json({ error: 'Error uploading image' });
      }
    } else {
      console.log("No file uploaded or multer configuration issue");
    }

    const newPost = new Post({
      _id: req.body._id,
      title: req.body.title,
      content: req.body.content,
      img_url: imageUrl,
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
    console.log({ message: "Post created successfully", post: newPost });
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