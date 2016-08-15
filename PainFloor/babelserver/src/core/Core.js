import PickRole from './states/global/PickRole'

class Core {
	
	constructor() {
		this.connections = []
	}

	addConnection(connection) {
		const id = this.connections.length
		this.connections[id] = {
			connection: connection,
			state: new PickRole()
		}
		return id
	}


	incomingMessage(id, data) {

		const handle = this.connections[id].state.incomingMessage(data)
		
		if(!handle) {
			return
		}

		if(handle.nextState) {
			this.connections[id].state = handle.nextState
		}

		if(handle.ack) {
			return ack	
		}
				
	}

	outgoingMessage(id, data) {
		connections[id].connection.sendMessage(data)
	}

	closeConnection(id) {
		delete this.connections[id]
	}
}

export const core = new Core()





