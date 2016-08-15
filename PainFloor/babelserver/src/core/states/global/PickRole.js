import State from '../State'
import SpectatingMenu from '../spectator/SpectatingMenu'
import ControllingMenu from '../spectator/ControllingMenu'
import shortid from 'shortid'

const checkData() {

}

class PickRole extends State {
	constructor() {
		super('PICK_ROLE')
	}
	incomingMessage(data) {
		let out = {}
		if(data.type === 'PICK_ROLE') {
			if(!data.role) {
				out.ack = {error: 'No role defined'}
			} else {
				if(data.role === 'spectator') {
					const code = shortid.generate()
					out.nextState = new SpectatingMenu(code)
					out.ack = {
						type: out.nextState.TYPE, 
						code: out.nextState.code
					}
				} else if(data.role === 'controller') {
					if(data.code) {
						out.nextState = new ControllingMenu(data.code)
					}
				} else {
					out.ack = {error: 'Incorrect role'}
				}
			}
		} else {
			out.ack = {error: 'Incorrect data type'}
		}
		return out
	}
}


export default PickRole