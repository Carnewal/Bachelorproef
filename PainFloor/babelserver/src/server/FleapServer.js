import {core} from '../core/Core'

import FleapExpress from './expr'
import FleapWebsocket from './websocket'


const FleapServer = () => {

	const fleapExpress = new FleapExpress()
	const fleapWebsocket = new FleapWebsocket(fleapExpress)


	fleapExpress.listen(1337)

}

export default FleapServer