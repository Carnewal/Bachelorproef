import React from 'react'
import THREE from 'three'
import React3 from 'react-three-renderer';
import { Provider } from 'react-redux'

import Camera from './Camera'
import World from './World'
import Players from './Players'

class Simple extends React.Component {

  componentDidMount() {
    window.addEventListener("resize", (event) => {
      this.props.onResize(event);
    });    
    window.addEventListener("keydown", (event) => {
      this.props.onKeyDown(event);
    });
  }

  render() {
    const {camera, players, cubeRotation, width, height, store} = this.props
    return(
      <React3
        mainCamera={camera.name}
        width={width}
        height={height} >
        <scene>
          <Camera camera={camera} width={width} height={height}/>
          <World />
          <Players players={players}/>  
        </scene>
      </React3>
    )
  }
}


export default Simple