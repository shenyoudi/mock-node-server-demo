const {read} = require('../utils/file')
const path = require('path')

function getUserInfo (userid) {
	return read(path.resolve(__dirname, '../data/userInfo.json'))
		.then(data => {
			return (JSON.parse(data))[userid]
		})
}

exports.install = (server) => {
	server.get('/get-user-info', (req, res) => {
		console.log(req.data)
		if (req.data) {
			getUserInfo(req.data._id).then((info) => {
				res.json(info)
			})
		}
		else {
			res.json({code: 10000})
		}
		
		/* let data = Mock.mock({
			'data|5-10': [
				{
					'id|+1': 0,
					'name': '@cname'
				}
			]
		})
		res.json(data.data) */
	})
}
