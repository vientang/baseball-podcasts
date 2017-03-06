import constants from '../constants'

var initialState = {
	all: null,
	selected: null
}

export default (state = initialState, action) => {
	let updatedState = Object.assign({}, state);
	switch (action.type) {
		case constants.PODCASTS_RECEIVED: 
			// console.log('PODCASTS_RECEIVED', JSON.stringify(action.podcasts))
			updatedState['all'] = action.podcasts
			return updatedState
		case constants.PODCAST_SELECTED:
			// console.log('PODCASTS_SELECTED', JSON.stringify(action.podcast))
			// prevent excessive requests if user clicks same podcast twice in a row
			if (updatedState.selected !== null) {
				if (updatedState.selected.collectionId === action.podcast.collectionId) {
					return state;
				}
			}
			updatedState['selected'] = action.podcast
			return updatedState
		default: 
			return state
	}
}