const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express();
const userRoutes = require("./routes/user.routes")
const cookieParser = require('cookie-parser');
const multer = require('multer');
const connect = require("./db/db");
const uplaod = multer();
connect();

app.use(express.json());
app.use(express.urlencoded({extended: true }))
app.use(cookieParser());
app.use(uplaod.array());

app.use('/', userRoutes);


module.exports = app