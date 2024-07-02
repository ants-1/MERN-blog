const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, maxLength: 100, required: true },
  content: { type: String, required: true },
  img_url: {
    type: String,
    default:
      "https://res.cloudinary.com/dhdlno07z/image/upload/v1719942616/3fa834a33bd08318556849a044c8f440.png",
  },
  published: { type: Boolean, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

PostSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
