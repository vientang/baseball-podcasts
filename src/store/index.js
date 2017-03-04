import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { podcastReducer } from '../reducers'

var store;

export default {
	initialize: () => {
		const reducers = combineReducers({
			podcast: podcastReducer
		})
		store = createStore(
			reducers,
			applyMiddleware(thunk),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
		return store
	},
	currentStore: () => {
		return store
	}
}