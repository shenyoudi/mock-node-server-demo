const fs = require('fs')

exports.read = (path) => new Promise((resolve, rejected) => {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err != null) 
			rejected(err)
		else
			resolve(data)
	})
})

exports.write = (path, data) => new Promise((resolve,rejected) => {
	fs.writeFile(path, data, (err) => {
		if (err != null)
			rejected(err)
		else
			resolve(true)
	})
})