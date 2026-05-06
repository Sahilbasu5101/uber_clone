
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const connectTodb = require('./db/db');
connectTodb();
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/captain', captainRoutes);

app.use(cors()); 

app.get('/', (req, res) => {
  res.send("hello world");
});

module.exports = app;