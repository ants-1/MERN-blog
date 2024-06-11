const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT;

// Set up mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = process.env.DB_URL;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
    console.log('MongoDB connected');
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});