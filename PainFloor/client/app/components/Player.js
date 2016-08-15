import React from 'react'
import THREE from 'three'
import React3 from 'react-three-renderer';
// import fontDef from '../assets/font/droid_sans_mono_regular.typeface.js';


const getRandomColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// const font = new THREE.Font(JSON.parse(fontDef.substring(65, fontDef.length - 2)));


class Player extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		return true
	}
	render() {
		const {player} = this.props
		return (
			<object3D position={player.position}>

				<object3D rotation={player.rotation}>
					<mesh >
						<cylinderGeometry radiusTop={player.width} radiusBottom={player.width} height={player.height} radialSegments={32} heightSegments={1} />
				        <meshBasicMaterial color={getRandomColor()} />
				    </mesh>
				    <mesh 
				    	rotation={player.gun.rotation} 
				    	position={player.gun.position} >
						<cylinderGeometry radiusTop={10} radiusBottom={10} height={150} radialSegments={10} heightSegments={1} />
				        <meshBasicMaterial color={player.gun.color} />
				    </mesh>
				</object3D>
			</object3D>
		)
	}
}


export default Player