const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, maxLength: 100, required: true },
    email: { type: String, maxLength: 256, required: true },
    password: { type: String, maxLength: 150, required: true },
    is_admin: { type: Boolean, required: true },
    date_joined: { type: Date, default: Date.now },
});

UserSchema.virtual('url').get(function() {
    return `/user/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);