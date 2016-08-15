
const keymiddleware = store => next => action => {

	if(action.type === 'KEY_DOWN') {
		console.log('keydown')
	} else if(action.type === 'KEY_UP') {
		console.log('keyup')
	}

	return next(action);
}

export default keymiddleware