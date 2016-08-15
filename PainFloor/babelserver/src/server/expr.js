import express from 'express'
import http from 'http'

class FleapExpress {
	constructor() {
		this.app = express()
		this.server = http.createServer(this.app)
		this.app.use((req, res) => {
		  res.send({ msg: "hello there" })
		})
		this.server.on('request', this.app);
	}

	listen(port) {
		this.server.listen(port)
	}
}


export default FleapExpress
