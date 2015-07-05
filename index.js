var static = require('node-static');
var port = 8080;

//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('./');

var server = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(port);
server.static = file;

console.log("Static server @ localhost:" + port);

module.exports = {
    server: server,
    port: port
};
