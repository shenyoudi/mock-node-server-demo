const jwt = require('jsonwebtoken')
const signkey = 'signkey'

exports.setToken = (username, userid) => new Promise((resolve, rejected) => {
	const token = jwt.sign({
		name: username,
		_id: userid
	},  
	signkey,  
	{
		expiresIn: 60*60*24
	})
	resolve(token)
})

exports.verToken = (token) => new Promise((resolve, rejected) => {
	let info = jwt.verify(token, signkey)
	resolve(info)
})

exports.secret = signkey