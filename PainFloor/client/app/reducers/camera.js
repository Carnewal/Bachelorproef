import Types from '../constants/actiontypes'
import THREE from 'three'

const camera = (
	state = {
		name: 'Camera',
		fov: 80,
		far:20000,
		near:1,
		position: (new THREE.Vector3(0, -2800, 3200)),
		lookAt: new THREE.Vector3(0, -600, 0)
	}, action) => {

	switch(action.type) {
		//case Types.MOVE_CAMERA:
		default:
			return state
	}

}

export default camera