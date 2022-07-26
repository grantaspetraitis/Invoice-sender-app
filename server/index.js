const express = require('express');
require('dotenv').config();
const cors = require('cors');
const initDB = require('./db').initDB;
const pdf = require('html-pdf');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ['http://localhost:3002', 'http://localhost:3000', 'https://invoice-sender-app.vercel.app']
}));

initDB();


const routes = require('./routes/user');
app.use('/', routes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));