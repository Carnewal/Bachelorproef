import State from '../../State'

class SpectatingMenu extends State {
	constructor() {
		super('SPECTATING_MENU')
		
	}

	incomingMessage(data) {
		let out = {}
		if(data.type === this.TYPE) {
			if(!data.role) {
				out.ack = {error: 'No role defined'}
			} else {
				if(data.role === 'spectator') {
					out.nextState = new SpectatingMenu()
					out.ack = out.nextState.TYPE
				} else if(data.role === 'controller') {
					out.nextState = new ControllingMenu()
				} else {
					out.ack = {error: 'Incorrect role'}
				}
			}
		}
		return out
	}
}


export default PickRole