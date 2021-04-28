const express = require('express')

const server = express()

/*为app添加中间件处理跨域请求*/
server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

exports.server = server

exports.start = () => {
	server.listen(8081, () => {
		console.log('mock start: http://127.0.0.1:8081')
	})
}