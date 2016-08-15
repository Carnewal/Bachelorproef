import { combineReducers } from 'redux'
import cube from './cube'
import camera from './camera'
import players from './players'
import windw from './windw'

export default combineReducers({
  cube,
  camera,
  players,
  windw
})