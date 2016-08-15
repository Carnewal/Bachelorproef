import Types from '../../shared/actiontypes'

const spectator = (state = [], action) => {
	switch(action.type) {
		case Types.NEW_SPECTATOR:
		case Types.DISCONNECTED_SPECTATOR:
		default:
			return state
	}
}

export default game