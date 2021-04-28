const {server} = require('../server/server')
const {verToken} = require('../utils/token')
const {mock} = require('mockjs')
const fs = require('fs')

const routers = fs.readdirSync(__dirname)

server.use((req, res, next) => {
	let token = req.headers['authorization']
	if (token == undefined)
		return next()
	else
		verToken(token).then(data => {
			req.data = data
			return next()
		}).catch(err => {
			return next()
		})
})

routers.map((path) => {
	if (path != 'index.js') {
		require(`./${path}`).install(server, mock)
	}
})
