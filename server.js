const http = require('http')
const app = require('./app.js')

const Port  = process.env.PORT || 4000
const server = http.createServer(app)

server.listen(Port, ()=>{
	console.log('runnung')
})