
Gun = function() {
    
    var self = this;
    
    self.geometry = new THREE.CylinderGeometry(10, 10, 100, 32);
    self.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    THREE.Mesh.call(self, self.geometry, self.material); //This creates the mesh

    self.rotation.z = -Math.PI/2
    self.rotation.y = -Math.PI/2
    self.position.x = 0;
    self.position.y = 0;
    self.position.z = 50;
    
};

Gun.prototype = Object.create(THREE.Mesh.prototype);

