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

function fileAccess(filepath) {
	return new Promise((resolve, reject) => {
		fs.access(filepath, fs.F_OK, error => {
			if (!error) {
				resolve(filepath);
			} else {
				reject(error);
			}
		});
	});
};

function fileReader(filepath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filepath, (error, content) => {
			if (!error) {
				resolve(content);
			} else {
				reject(error);
			}
		});
	});
};

function webserver(req, res) {
	// if the route is '/' load index.htm else load the requested file

	let baseURL = url.parse(req.url);
	let filepath = __dirname + (baseURL.pathname === '/' ? '/index.htm' : baseURL.pathname);
	let contentType = mimes[path.extname(filepath)];

	fileAccess(filepath)
		.then(fileReader)
		.then(content => {
			res.writeHead(200, {'Content-type': contentType});
			res.end(content, 'utf-8');
		})
		.catch(error => {
			res.writeHead(404);
			res.end(JSON.stringify(error));
		});

}

http.createServer(webserver).listen(3000, () => console.log('Webserver listening at port 3000'));