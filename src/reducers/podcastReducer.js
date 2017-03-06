import constants from '../constants'

var initialState = {
	all: null,
	selected: null,
	trackList: null,
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
			updatedState['trackList'] = null
			updatedState['selected'] = action.podcast
			return updatedState
		case constants.TRACKLIST_READY: 
		// console.log('TRACKLIST_READY', JSON.stringify(action.list))
			updatedState['trackList'] = action.list
			return updatedState
		default: 
			return state
	}
}