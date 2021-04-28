const {read, write} = require('../utils/file')
const path = require('path')
const article_path = path.resolve(__dirname, '../data/article.json')
let mock

function getUserInfo (userid) {
	return read(path.resolve(__dirname, '../data/userInfo.json'))
		.then(data => {
			return (JSON.parse(data))[userid]
		})
}

function getRandomArticle () {
	let data = mock({
		'data|1-10' : [
			{
				'article_id|+1': article_id+1,
				'article_title': '@ctitle(8, 12)',
				'time': '@datetime',
				'user_id': 0,
				'good': 0
			}
		]
	})
	return data.data
}

let article_id = null
let data_article = null
let prev_time = null

async function getArticleJsonData (time) {
	
	if (prev_time == null) {
		data_article = JSON.parse(await read(article_path))
		prev_time = time
	}

	if (!data_article.length || time - prev_time > 1000*60*60) {
		let data = getRandomArticle()
		data_article.push(...data)
		await write(article_path, JSON.stringify(data_article))
	}
	article_id = data_article.length
	return data_article
}

exports.install = (server, m) => {
	mock = m
	
	server.post('/get-article', (req, res) => {
		req.on('data', async (data) => {
			let json = await getArticleJsonData(JSON.parse(data).time)
			res.json(json)
		})
	})
}
