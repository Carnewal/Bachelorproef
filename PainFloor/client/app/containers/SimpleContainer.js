import { connect } from 'react-redux'

import Simple from '../components/Simple'
import { rotateCube } from '../actions/cube'

import {resize} from '../actions/windw'

const onKeyDown = (dispatch) => {
	return (event) => {
		dispatch({type: 'KEY_DOWN', event: event})
		console.log("Key dn")
	}
}
const onKeyUp = (dispatch) => {
	return (event) => {
		//dispatch({type: 'KEY_UP', event: event})
	}
}
const onResize = (dispatch) => {
	return (event) => {
		dispatch(resize(event))
	}
}


const mapStateToProps = (state) => {
	console.log(state.windw)
	return {
		camera: state.camera,
		players: state.players ? state.players : [],
		width: state.windw.width,
		height: state.windw.height
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onKeyDown: onKeyDown(dispatch),
		onKeyUp: onKeyUp(dispatch),
		onResize: onResize(dispatch)
	}
}

const SimpleContainer = connect(mapStateToProps, mapDispatchToProps)(Simple)

export default SimpleContainer
