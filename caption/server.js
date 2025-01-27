const http = require('http');

const app = require('./app');

const server = http.createServer(app);

server.listen(3002,'0.0.0.0',() => {
    console.log('Caption service is running on port 3002');
});

