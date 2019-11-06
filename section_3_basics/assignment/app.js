const routes = require('./routes');
const http = require('http');

// spin a server
const server = http.createServer(routes.handler);

//set the server to listen to port 3000
server.listen(3000);