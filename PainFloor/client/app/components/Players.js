import React from 'react'
import THREE from 'three'
import React3 from 'react-three-renderer';

import Player from './Player'

const Players = ({players}) => (
  <scene>
    {players.map((p, i) => {
    	console.log(p)
      	return(<Player key={i} player={p} />)
      }
    )}
  </scene>
)

export default Players