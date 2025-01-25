const express = require('express');

const expressProxy = require('express-http-proxy');

const app = express();


app.use('/user',expressProxy('https://qx6251wm-3001.inc1.devtunnels.ms/'));


app.listen(3000,'0.0.0.0', () =>{
    console.log('Server start at port 3000 Successfully');
})