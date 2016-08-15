//window.innerWidth
import Types from '../constants/actiontypes'
import THREE from 'three'

const windw = (state = {
			width: window.innerWidth,
			height: window.innerHeight
	}
	, action) => {

	switch(action.type) {
		case Types.RESIZE:
			return Object.assign({}, state, {
				width: window.innerWidth,
				height: window.innerHeight
			})
		default:
			return state
	}
}

export default windw