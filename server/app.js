const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

// Set up mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = process.env.DB_URL;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
    console.log('MongoDB connected');
}

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
