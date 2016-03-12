
Player = function () {

    var self = this;

    self.geometry = new THREE.CylinderGeometry(50, 50, 100, 32);
    self.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    THREE.Mesh.call(self, self.geometry, self.material);
    self.position.z = 50;
    self.rotation.x = -Math.PI / 2;
    
    self.gun = null;
    

};

Player.prototype = Object.create(THREE.Mesh.prototype);

Player.prototype.addGun = function(gun) {
    this.gun = gun;
    this.add(gun);
}