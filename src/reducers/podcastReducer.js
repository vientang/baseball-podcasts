import constants from '../constants'

var initialState = {
	all: null
}

export default (state = initialState, action) => {
	let updatedState = Object.assign({}, state);
	switch (action.type) {
		case constants.PODCASTS_RECEIVED: 
			// console.log('PODCASTS_RECEIVED', JSON.stringify(action.podcasts))
			updatedState['all'] = action.podcasts
			return updatedState
		default: 
			return state
	}
}