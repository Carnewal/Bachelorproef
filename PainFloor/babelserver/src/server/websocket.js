import {core} from '../core/Core'
import ws from 'ws'



const WSServer = ws.Server


class WebSocketServer {

	constructor(fleapExpress) {

		this.server = new WSServer({server: fleapExpress.server})
		this.server.on('connection', (ws) => {
			this.startConnection(ws)
		})
	}


	startConnection(ws) {
		ws.id = core.addConnection(ws)

		ws.onmessage = (evt) => {
			const ack = core.incomingMessage(ws.id, this.normalizeIncomingMessage(evt.data))
			if(ack) {
				ws.sendMessage(evt.data)
			}
		}

		ws.onclose = () => {
			core.closeConnection(ws.id)
		}

		//From core
		ws.sendMessage = (data) => {
			ws.send(this.normalizeOutgoingMessage(data))
		}


	}

	normalizeIncomingMessage(data) {
		return JSON.parse(data)
	}

	normalizeOutgoingMessage(data) {
		return data
	}



}

export default WebSocketServer