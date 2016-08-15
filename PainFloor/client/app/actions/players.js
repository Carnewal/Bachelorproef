import Types from '../constants/actiontypes'

export const updatePlayers = (players) => {
	return {
		type: Types.UPDATE_PLAYERS,
		players: players
	}
}