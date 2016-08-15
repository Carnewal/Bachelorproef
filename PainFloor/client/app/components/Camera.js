import React from 'react'

class Camera extends React.Component {
	render() {
		const {camera, width, height} = this.props

		return(
          <perspectiveCamera
            name={camera.name}
            fov={camera.fov}
            aspect={width / height}
            near={camera.near}
            far={camera.far}
            position={camera.position}
            lookAt={camera.lookAt}>
            </perspectiveCamera>
		)
	}
}

export default Camera