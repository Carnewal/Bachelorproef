var scene = new THREE.Scene();


//var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var width = window.innerWidth;
var height = window.innerHeight;


//Helper
var axisHelper = new THREE.AxisHelper(500);
scene.add(axisHelper);

var players = [];


var zeroVector = new THREE.Vector3(0, 0, 0);

setUpMap();

var player = new Player();
var gun = new Gun();
player.addGun(gun);

scene.add(player);


//Camera

var camera = new THREE.PerspectiveCamera(
    54,
    window.innerWidth / window.innerHeight,
    1,
    20000);
camera.position.y = -3000;
camera.position.z = 3200;

var cameraVector = new THREE.Vector3(0, -600, 0);
camera.lookAt(cameraVector);

scene.add(camera);


var rotating = 0;



var render = function () {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};



render();



function setUpMap() {
	
	//Walls
	var geometry = new THREE.BoxGeometry(6100, 100, 600);
	var material = new THREE.MeshBasicMaterial({ color: 0x9B9FA5 }); //green
	var wallN = new THREE.Mesh(geometry, material);
	wallN.position.y = -2000;
	var wallS = new THREE.Mesh(geometry, material);
	wallS.position.y = 2000;
	var geometry = new THREE.BoxGeometry(4000, 100, 600);
	var wallE = new THREE.Mesh(geometry, material);
	wallE.position.x = -3000;
	wallE.rotation.z = -Math.PI / 2;
	var wallW = new THREE.Mesh(geometry, material);
	wallW.position.x = 3000;

	wallW.rotation.z = -Math.PI / 2;

	scene.add(wallN);
	scene.add(wallS);
	scene.add(wallE);
	scene.add(wallW);

	//Ground
	var grassTex = THREE.ImageUtils.loadTexture('img/texture/tile.png');
	grassTex.wrapS = THREE.RepeatWrapping;
	grassTex.wrapT = THREE.RepeatWrapping;
	grassTex.repeat.x = 12;
	grassTex.repeat.y = 8;
	var groundMat = new THREE.MeshBasicMaterial({ map: grassTex });
	var groundGeo = new THREE.PlaneGeometry(6000, 4000);
	var ground = new THREE.Mesh(groundGeo, groundMat);
	ground.position.y = 0; //lower it 
	//ground.rotation.x = -Math.PI / 2; //-90 degrees around the xaxis 
	ground.doubleSided = true;
	scene.add(ground);
};




var isMouseDown = false;
var theta, phi, radious, onMouseDownPosition = new THREE.Vector2(), radious = 1600, theta = 45, onMouseDownTheta = 45, phi = 60, onMouseDownPhi = 60,
	isShiftDown = false;;

function onDocumentMouseDown(event) {
	event.preventDefault();
	isMouseDown = true;
	onMouseDownPosition.x = event.clientX;
	onMouseDownPosition.y = event.clientY;

}

function onDocumentMouseUp(event) {
	event.preventDefault();
	isMouseDown = false;
}
function onDocumentMouseMove(event) {

    event.preventDefault();

    if (isMouseDown) {


		var changeX = event.clientX - onMouseDownPosition.x;
		var changeY = event.clientY - onMouseDownPosition.y;

		camera.position.x -= changeX;
		camera.position.y += changeY;
		onMouseDownPosition.x += changeX;
		onMouseDownPosition.y += changeY;

    }



}


function onDocumentMouseWheel(event) {

	var dy = event.wheelDeltaY || event.wheelDelta || event.detail;

	if (dy) {
		if (dy < 0) {
			camera.position.y *= 1.03;
			camera.position.z *= 1.03;
		} else {
			camera.position.y *= 0.97;
			camera.position.z *= 0.97;
		}
	}
}


function onWindowResize() {
	console.log("resize");

				camera.left = window.innerWidth / - 2;
				camera.right = window.innerWidth / 2;
				camera.top = window.innerHeight / 2;
				camera.bottom = window.innerHeight / - 2;

				camera.updateProjectionMatrix();

				renderer.setSize(window.innerWidth, window.innerHeight);

}

var socket = io.connect('http://127.0.0.1:42069/spectator');
var moving = false;

socket.on('connect', function () {
	console.log('Connected successfully to the server.');
});
socket.on('movedata', function (movedata) {


	player.rotation.y = (- movedata.angle + 90) * Math.PI / 180;

	if (movedata.move) {
		console.log("moving..");
		moving = true;
	} else {
		moving = false;
	}

	console.log(movedata);
});



setInterval(function () {

	if (moving) {
		player.translateZ(8)
	}

}, 10);