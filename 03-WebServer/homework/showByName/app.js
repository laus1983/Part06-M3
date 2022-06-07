var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor

http.createServer(function(req, res) {
    if (req.url === '/arcoiris') {
        res.writeHead(200, {'Content-Type': 'image/jpg'})
        var img = fs.readFileSync(__dirname + '/images/arcoiris_doge.jpg')
        res.end(img, 'binary');
    } else if (req.url === '/badboy') {
        res.writeHead(200, {'Content-Type': 'image/jpg'})
        var img = fs.readFileSync(__dirname + '/images/badboy_doge.jpg')
        res.end(img, 'binary');
    } else if (req.url === '/code') {
        res.writeHead(200, {'Content-Type': 'image/jpg'})
        var img = fs.readFileSync(__dirname + '/images/code_doge.jpg')
        res.end(img, 'binary');
    } else if (req.url === '/resaca') {
        res.writeHead(200, {'Content-Type': 'image/jpg'})
        var img = fs.readFileSync(__dirname + '/images/resaca_doge.jpg')
        res.end(img, 'binary');
    } else if (req.url === '/retrato') {
        res.writeHead(200, {'Content-Type': 'image/jpg'})
        var img = fs.readFileSync(__dirname + '/images/retrato_doge.jpg')
        res.end(img, 'binary');
    } else if (req.url === '/sexy') {
        res.writeHead(200, {'Content-Type': 'image/jpg'})
        var img = fs.readFileSync(__dirname + '/images/sexy_doge.jpg')
        res.end(img, 'binary');
    } else {
        res.writeHead(404);
        res.end('Image Not found');
    }
}).listen(1337, '127.0.0.1');
