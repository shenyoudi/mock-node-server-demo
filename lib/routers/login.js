const {read, write} = require('../utils/file')
const {secret, setToken} = require('../utils/token')
const expressJwt = require('express-jwt')
const path = require('path')
const routePath = '/login'

class UserList {
	constructor () {
		this.path = path.resolve(__dirname, '../data/userList.json')
		this.data
		this.getUserList()
	}

	getUserList () {
		read(this.path)
			.then(data => {
				this.data = JSON.parse(data)
			}, err => {
				console.log(err)
			})
	}

	setUserList () {
		return write(this.path, JSON.stringify(this.data))
			.then(data => {
				return data
			}, err => {
				console.log(err)
			})
	}

	addUserList (userdata) {
		let id = this.data[this.data.length - 1].id + 1
		this.data.push({id, ...userdata})
		return this.setUserList()
	}

	delUserList ({id}) {
		for (let i = 0, len = this.data.length; i < len; i++) {
			if (id == this.data[i].id)
				this.data.splice(i, 1)
				i--
		}
		return this.setUserList()
	}

	findUser ({username, password}) {
		let res = this.data.find(({username: name, password: pwd}) => name == username && password == pwd)
		return res
	}
}

const User = new UserList()


exports.install = (server) => {
	
	server.use(expressJwt({
		secret,
		algorithms: ['HS256']
	}).unless({
		path: [routePath]
	}))

	server.post(routePath, (req, res) => {
		req.on('data', (data) => {
			let user = User.findUser(JSON.parse(data))
			if (user)
				setToken(user.username, user.id)
					.then(data => res.json({
							res: true,
							token: data
					}))
			else 
				res.json({data: false})
		})
	})
}