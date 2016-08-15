import rollover from '../meshes/rollover'

class Player {
	constructor() {
		this.color = 
		this.rollover = rollover(this.color)
	}

	move(direction) {
		switch(direction) {
			case 'UP':
				
				break
			case 'DN':
			case 'LT':
			case 'RT':
				break
		}
	}
}

export default Player