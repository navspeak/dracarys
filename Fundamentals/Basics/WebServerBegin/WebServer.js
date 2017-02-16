'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let mimes = {
	'.htm' : 'text/html',
	'.css' : 'text/css',
	'.js'  : 'text/javascript',
	'.gif' : 'image/gif',
	'.jpg' : 'image/jpeg',
 	'.png' : 'image/png'
};

function webserver(req, res) {
	// if the route is '/' load index.htm else load the requested file

	let baseURL = url.parse(req.url);
	let filepath = __dirname + (baseURL.pathname === '/' ? '/index.htm' : baseURL.pathname);

	// check if the file is accessible
	fs.access(filepath, fs.F_OK, error => {
		if (!error){
			fs.readFile(filepath, (error, content) => {
				if (!error) {
					console.log('Serving: ', filepath);
					let contentType = mimes[path.extname(filepath)];
					res.writeHead(200, {'Content-type' : contentType});
					res.end(content, 'utf-8');
				} else {
					res.writeHead(500);
					res.end('Server could not read file accessible!');					
				}
			});

		} else {
			res.writeHead(404);
			res.end('Content not found!');
		}

	});

}

http.createServer(webserver).listen(3000, () => { 
	console.log('Webserver listening at port 3000');
});