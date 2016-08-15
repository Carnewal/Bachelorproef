import React from 'react'
import THREE from 'three'
import React3 from 'react-three-renderer'

class World extends React.Component {

  shouldComponentUpdate() {
    console.log("Stopping world update")
    return false
  }

  render() {
    return(

      <scene>
        
      <resources>
        <texture
          resourceId='1'
          url="../assets/texture/wall.jpg"
          wrapS={THREE.RepeatWrapping}
          wrapT={THREE.RepeatWrapping}
          repeat={new THREE.Vector2(14,1)}
          anisotropy={16}
        />      
        <texture
          resourceId='2'
          url="../assets/texture/tile.png"
          wrapS={THREE.RepeatWrapping}
          wrapT={THREE.RepeatWrapping}
          repeat={new THREE.Vector2(12,8)}
          anisotropy={16}
        />

      </resources>
        <mesh position={(new THREE.Vector3(0, -2000, 0))} > 
          <boxGeometry width={6100} height={100} depth={600} />
          <meshBasicMaterial color={0x9B9FA5}>
            <textureResource resourceId='1' />
          </meshBasicMaterial>
        </mesh>
        <mesh position={(new THREE.Vector3(0, 2000, 0))} >
          <boxGeometry width={6100} height={100} depth={600} />
          <meshBasicMaterial color={0x9B9FA5}>
            <textureResource resourceId='1' />
          </meshBasicMaterial> 
        </mesh>
        <mesh position={(new THREE.Vector3(-3000, 0, 0))} rotation={new THREE.Euler(0,0,-Math.PI / 2)} >
          <boxGeometry width={4000} height={100} depth={600} />
          <meshBasicMaterial color={0x9B9FA5}>
            <textureResource resourceId='1' />
          </meshBasicMaterial>
        </mesh>
        <mesh position={(new THREE.Vector3(3000, 0, 0))} rotation={new THREE.Euler(0,0,-Math.PI / 2)} >
          <boxGeometry width={4000} height={100} depth={600} />
          <meshBasicMaterial color={0x9B9FA5}>
            <textureResource resourceId='1' />
          </meshBasicMaterial>
        </mesh>
        <mesh position={(new THREE.Vector3(0, 0, 0))} >
          <planeGeometry width={6000} height={4000} />
          <meshBasicMaterial>
            <textureResource resourceId='2' />
          </meshBasicMaterial>
        </mesh>
      </scene>
    )
  }
}


export default World