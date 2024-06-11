const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, maxLength: 100, required: true },
    content: { type: String, required: true },
    img_url: { type: String },
    published: { type: Boolean, required: true},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    timestamp: { type: Date, default: Date.now },
});

PostSchema.virtual('url').get(function() {
    return `/post/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);