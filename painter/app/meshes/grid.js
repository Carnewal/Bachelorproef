import THREE from 'three'

const grid = (size = 500, step = 50) => {
	const geometry = new THREE.Geometry();
	for ( let i = - size; i <= size; i += step ) {
		geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
		geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
	}
	let material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
	return new THREE.LineSegments( geometry, material );
}

export default grid
