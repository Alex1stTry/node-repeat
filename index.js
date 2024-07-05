const {foo} = require('./helper/helper');
const http = require("node:http");


const result = foo();


let server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(result)
});


server.listen(4000)