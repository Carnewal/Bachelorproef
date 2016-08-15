import Types from '../constants/actiontypes'


export const resize = (event) => {
	return {
		type: Types.RESIZE,
		event: event
	}
}