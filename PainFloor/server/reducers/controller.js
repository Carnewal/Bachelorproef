import Types from '../../shared/actiontypes'

const controller = (state = [], action) => {
	switch(action.type) {
		case Types.CONNECTED_CONTROLLER:
		case Types.DISCONNECTED_CONTROLLER:
		case Types.INPUT_CONTROLLER:
		default:
			return state
	}
}

export default controller