import THREE from 'three'


const rollover = (color, size = 50) => {
	const rollOverGeo = new THREE.BoxGeometry( size, size, size )
	const rollOverMaterial = new THREE.MeshBasicMaterial( { 
		wireframe: true, 
		color: color, 
		opacity: 1, 
		transparent: true } )
	let mesh = new THREE.Mesh( rollOverGeo, rollOverMaterial )
	mesh.position.set(25,25,25)
	return mesh
}

export default rollover