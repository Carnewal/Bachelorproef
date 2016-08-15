import Types from '../constants/actiontypes'
import THREE from 'three'

const players = (state = [
		{
			name: "Brad",
			health: 100,
			color: 0x000000,
			position: new THREE.Vector3(0, 0, 50),
			rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
			width: 50,
			height: 100,
			gun: {
				position: new THREE.Vector3(0,0,-50),
				rotation: new THREE.Euler(0, - Math.PI/2, - Math.PI/2),
				color: 0xffffff
			}
		}
	], action) => {

	switch(action.type) {
		case Types.UPDATE_PLAYERS:
			return Object.assign({}, state, {
				players: action.players
			})
		case Types.KEY_DOWN:
			const plyrs = state.slice()
			switch(action.event.keyIdentifier) {
				case 'Up':
					plyrs[0].position = new THREE.Vector3(plyrs[0].position.x, plyrs[0].position.y + 10, plyrs[0].position.z)
					plyrs[0].rotation = new THREE.Euler(-Math.PI/2, Math.PI, 0)
					break
				case 'Down':
					plyrs[0].position = new THREE.Vector3(plyrs[0].position.x, plyrs[0].position.y - 10, plyrs[0].position.z)
					plyrs[0].rotation = new THREE.Euler(-Math.PI/2, 0, 0)
					break
				case 'Left':
					plyrs[0].position = new THREE.Vector3(plyrs[0].position.x - 10, plyrs[0].position.y, plyrs[0].position.z)
					plyrs[0].rotation = new THREE.Euler(-Math.PI/2, Math.PI / 2, 0)
					break
				case 'Right':
					plyrs[0].position = new THREE.Vector3(plyrs[0].position.x + 10, plyrs[0].position.y, plyrs[0].position.z)
					plyrs[0].rotation = new THREE.Euler(-Math.PI/2, - Math.PI / 2, 0)
					break
			}
			console.log(action.event)
			return plyrs
		default:
			return state
	}
}

export default players