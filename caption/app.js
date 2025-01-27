const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express();
const captionRoutes = require("./routes/caption.routes")
const cookieParser = require('cookie-parser');
const multer = require('multer');
const connect = require("./db/db");
const uplaod = multer();
connect();

app.use(express.json());
app.use(express.urlencoded({extended: true }))
app.use(cookieParser());
app.use(uplaod.array());

app.use('/', captionRoutes);


module.exports = app