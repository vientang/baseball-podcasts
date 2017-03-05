import React, { Component} from 'react'
import { Search } from '../presentation'
import { APIClient } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions'

class Playlist extends Component {
	constructor(props) {
		super(props)
		this.searchPodcasts = this.searchPodcasts.bind(this)
	}
	searchPodcasts(event){
		if (event.keyCode != 13) 
			return
		// console.log('searchPodcasts: '+event.target.value)
		const endpoint = '/search/'+event.target.value
		APIClient
		.get(endpoint, null)
		.then(response => {
			this.props.podcastsReceived(response)
		})
		.catch(err => {
			console.log('ERROR in playlist: '+JSON.stringify(err))
		})
	}

	render(){
		return (
			<div>
				<div className="hero-header bg-shop animated fadeindown">
				  <h1 className="hero-title">Playlist</h1>
				</div>
				<Search onSearch={this.searchPodcasts} />
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		podcasts: state.podcast
	}
}

const dispatchToProps = (dispatch) => {
	return {
		podcastsReceived: (podcasts) => dispatch(actions.podcastsReceived(podcasts))
	}
}

export default connect(stateToProps, dispatchToProps)(Playlist)