require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
let bodyParser = require('body-parser');
let helmet = require('helmet');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));

const routes = require('./routes/routes.js');

app.use('/', routes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})