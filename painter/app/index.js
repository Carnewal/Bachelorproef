import THREE from 'three'
import CanvasRenderer from './three/renderers/CanvasRenderer'
import _OrbitControls from 'three-orbit-controls'
import Projector from './three/renderers/Projector'
import io from 'socket.io-client'
import rollover from './meshes/rollover'
import grid from './meshes/grid'
import gRenderer from './renderer/renderer'

const OrbitControls = _OrbitControls(THREE)

const socket = io('http://localhost')


var container;
var camera, scene, renderer;
var plane, cube;
var mouse, raycaster, isShiftDown = false;
var rollOverMaterial, rollOverGeo;
var cubeGeo, cubeMaterial;
var objects = [];



container = document.createElement( 'div' );
document.body.appendChild( container );
var info = document.createElement( 'div' );
info.style.float = 'left'

info.style.position = 'absolute';
info.style.top = '10px';
info.style.left = '10px';
info.style.width = '100%';
info.style.textAlign = 'left';
info.innerHTML = '<span>Players:</span>';

var list = document.createElement( 'ul' )
var listE = document.createElement( 'li' )
listE.innerHTML = 'Brecht'
list.appendChild( listE )
info.appendChild( list )


container.appendChild( info );
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set( -500, 800, -1300 );
camera.lookAt( new THREE.Vector3() );


scene = new THREE.Scene();

cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load( "textures/square-outline-textured.png" ) } );
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

let players = {}

players['brecht'] = new rollover('#'+(Math.random()*0xFFFFFF<<0).toString(16))

scene.add( players['brecht'] )

const size = 600
const step = 50

let line = new grid(size, step)
scene.add( line )

plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( size * 2, size * 2 ).rotateX( - Math.PI / 2 ), new THREE.MeshBasicMaterial( { visible: true } ) );

scene.add( plane );
objects.push( plane );

var ambientLight = new THREE.AmbientLight( 0x606060 );
scene.add( ambientLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
scene.add( directionalLight );

renderer = new gRenderer();

container.appendChild( renderer.domElement );

document.addEventListener( 'keydown', onDocumentKeyDown, false );
document.addEventListener( 'keyup', onDocumentKeyUp, false );

window.addEventListener( 'resize', onWindowResize, false );



function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


console.log(OrbitControls)
let controls = new OrbitControls( camera );
controls.addEventListener( 'change', render );

const animate = () => {
  requestAnimationFrame( animate );
  controls.update();
}

function render() {
	renderer.render( scene, camera );
}
	animate();
		render();



		function onDocumentKeyDown( event ) {
			const id = 'brecht'
			console.log(event.keyCode)
			switch( event.keyCode ) {
				case 13: //Enter
					place(players['brecht'])
					break;
				case 32: //Space
					remove(players['brecht'])
					break;
				case 37: //Left
					move(players['brecht'], 'LT')
					break
				case 38: //Up
					move(players['brecht'], 'UP')
					break
				case 39: //Right
					move(players['brecht'], 'RT')
					break
				case 40: //Down
					move(players['brecht'], 'DN')
					break;
				case 107: //Plus
					move(players['brecht'], 'Y+')
					break
				case 109: //Min
					move(players['brecht'], 'Y-')
					break
				default:
					break
			}
		}
const onDocumentKeyUp = ( event ) => {
			switch ( event.keyCode ) {
				case 16: isShiftDown = false; break;
			}
		}
const place = (player) => {
	var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
	voxel.position.copy( player.position )
	voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 )
	scene.add( voxel )
	objects.push( voxel )
	render()
}

const remove = (player) => {

}

const move = (player, direction) => {
	console.log(direction)
	switch(direction) {
		case 'UP':
			player.position.add( new THREE.Vector3(0,0,50) );
			break
		case 'DN':
			player.position.add( new THREE.Vector3(0,0,-50) );
			break
		case 'LT': 
			player.position.add( new THREE.Vector3(50,0,0) );
			break
		case 'RT':
			player.position.add( new THREE.Vector3(-50,0,0) );
			break
		case 'Y+':
			player.position.add( new THREE.Vector3(0,50,0) );
			break
		case 'Y-':
			if(player.position.y <= 50) {
				break
			} else {
				player.position.add( new THREE.Vector3(0,-50,0) );
			}
			break
		default:
			break;
	}
	console.log(player.position)
	player.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
	render();
}

/**
 * Controller connected
 * @param  {[type]} player) {	players[player.id] [description]
 * @return {[type]}         [description]
 */
socket.on('conn', function (player) {
	const color = player.color || '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	console.log(color)
	players[player.id] = new rollover(color)
});

/**
 * Controller disconnected
 * @param  {[type]} data) {	console.log(data);    socket.emit('my other event', { my: 'data' });} [description]
 * @return {[type]}       [description]
 */
socket.on('disconn', function (player) {
	delete players[player.id]
})

/**
 * Controller action
 * @param  {[type]} data) {	console.log(data);    socket.emit('my other event', { my: 'data' });} [description]
 * @return {[type]}       [description]
 */
socket.on('action', function (action) {
	switch(action.type) {
		default:
			break;
	}
});






/*			

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mousedown', onDocumentMouseDown, false );

	function onDocumentMouseMove( event ) {
					event.preventDefault();
					mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
					raycaster.setFromCamera( mouse, camera );
					var intersects = raycaster.intersectObjects( objects );

					if ( intersects.length > 0 ) {
						var intersect = intersects[ 0 ];
						let meshPoint = intersect.point
						if(intersect.point.y < 0) {
							console.log("fixing")
							meshPoint = new THREE.Vector3(meshPoint.x, 0, meshPoint.z)
						} 
						players['brecht'].position.copy( meshPoint )//.add( intersect.face.normal );
						players['brecht'].position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
					}
					render();
				}
				*/
			
/*							function onDocumentMouseDown( event ) {
					event.preventDefault();
					mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
					raycaster.setFromCamera( mouse, camera );
					var intersects = raycaster.intersectObjects( objects );
					if ( intersects.length > 0 ) {
						var intersect = intersects[ 0 ];
					// delete cube
					if ( isShiftDown ) {
						if ( intersect.object != plane ) {
							scene.remove( intersect.object );
							objects.splice( objects.indexOf( intersect.object ), 1 );
						}
					// create cube
					} else {
						var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
						voxel.position.copy( players['brecht'].position ).add( intersect.face.normal );
						//voxel.position.copy( intersect.point ).add( intersect.face.normal );
						//voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
						scene.add( voxel );
						objects.push( voxel );
				}
				render();
			}
		}*/