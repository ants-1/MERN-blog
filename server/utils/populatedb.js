// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

const comments = [];
const posts = [];
const users = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');

    await createUsers();
    console.log('Debug: Users created', users);
    await createComments();
    console.log('Debug: Comments created', comments);
    await createPosts(comments);
    console.log('Debug: Posts created', posts);

    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
}

async function createUser(
    index,
    username,
    email,
    password,
    is_admin,
    date_joined
) {
    const userDetails = {
        username: username,
        email: email,
        password: password,
        is_admin: is_admin,
        date_joined: date_joined,
    };

    const user = new User(userDetails);

    await user.save();
    users[index] = user;
    console.log(`Added user: ${user}`);
}

async function createComment(
    index,
    author, 
    timestamp, 
    text
) {
    const commentDetails = { 
        author, 
        timestamp, 
        text 
    };

    const comment = new Comment(commentDetails);

    try {
        await comment.save();
        comments[index] = comment;
        console.log(`Added comment: ${comment}`);
    } catch (err) {
        console.error(`Error adding comment by ${author}:`, err);
    }
}

async function createPost(
    index,
    title,
    content,
    img_url,
    published,
    commentIds,
    author,
    timestamp,
) {
    const postDetails = {
        title: title,
        content: content,
        img_url: img_url,
        published: published,
        comments: commentIds,
        author: author,
        timestamp: timestamp,
    };

    const post = new Post(postDetails);

    await post.save();
    posts[index] = post;
    console.log(`Added post: ${post}`);
}


async function createUsers() {
    console.log('Adding users');
    await Promise.all([
        createUser(
            0,
            'user0',
            'user0@email.com',
            '123456',
            true,
            new Date(),
        ),
        createUser(
            1,
            'user1',
            'user1@email.com',
            '123456',
            true,
            new Date(),
        ),
        createUser(
            2,
            'user2',
            'user2@email.com',
            '123456',
            true,
            new Date(),
        ),
    ]);
}

async function createComments() {
    if (users.length === 0) {
        throw new Error('No users found, cannot create comments');
    }

    console.log('Adding comments');
    await Promise.all([
        createComment(0, users[0]._id, new Date(), 'Nice post!'),
        createComment(1, users[1]._id, new Date(), 'Great post!'),
        createComment(2, users[2]._id, new Date(), 'Hi'),
        createComment(3, users[1]._id, new Date(), 'What a great post'),
    ]);
}

async function createPosts() {
    if (users.length === 0) {
        throw new Error('No users found, cannot create posts');
    }

    console.log('Adding Posts');
    await Promise.all([
        createPost(
            0,
            'My Test Post 1',
            'Hello and welcome to my first post on this website.',
            '',
            true,
            [comments[0]._id, comments[1]._id],
            users[2]._id,
            new Date(),
        ),
        createPost(
            1,
            'My Test Post 2',
            'Hello and welcome to my second post on this website.',
            '',
            true,
            [comments[2]._id, comments[3]._id],
            users[0]._id,
            new Date(),
        ),
    ]);
}


