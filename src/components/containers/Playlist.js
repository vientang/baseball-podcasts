import React, { Component} from 'react'
import { Title } from '../presentation'
import { APIClient } from '../../utils'
import { connect } from 'react-redux'
import APlayer from 'aplayer'
import actions from '../../actions'

class Playlist extends Component {
	constructor() {
		super()
		this.state = {			
			player: null
		}
		this.searchPodcasts = this.searchPodcasts.bind(this)
	}

	componentDidMount() {
		// initially load the player with baseball podcasts	
		this.searchPodcasts('baseball')
	}

	initializePlayer(list) {		
		let subList = [];
		if (list.length > 3) {
			for (var i = 0; i < 3; i++) {
				subList.push(list[i]);
			}
		} else { 
			subList = Object.assign([], list);
		}

		var ap1 = new APlayer({
	    element: document.getElementById('player'),
	    narrow: false,
	    autoplay: true,
	    showlrc: false,
	    mutex: true,
	    theme: '#e6d0b2',
	    preload: 'metadata',
	    mode: 'circulation',
	    music: subList
		});
		ap1.on('play', function () {
		    console.log('play');
		});
		ap1.on('play', function () {
		    console.log('play play');
		});
		ap1.on('pause', function () {
		    console.log('pause');
		});
		ap1.on('canplay', function () {
		    console.log('canplay');
		});
		ap1.on('playing', function () {
		    console.log('playing');
		});
		ap1.on('ended', function () {
		    console.log('ended');
		});
		ap1.on('error', function () {
		    console.log('error');
		});

		this.setState({
			player: ap1
		})
	}

	searchPodcasts(topic){
		const endpoint = '/search/'+topic
		APIClient
			.get(endpoint, null)
			.then(response => {
				//console.log("Response results is ", response)
				this.props.podcastsReceived(response.results)
			})
			.catch(err => {
				console.log('Playlist - ERROR in searchPodcasts: '+JSON.stringify(err))
			})
	}

	componentDidUpdate() {		
		if (this.props.podcasts.selected == null) return
		// feedUrl needs to come after the above statement or there will be an error
		const feedUrl = this.props.podcasts.selected['feedUrl']
		if (feedUrl == null) return

		// initialize the player when no podcast has been selected
		if (this.props.podcasts.trackList != null) {
			if (this.state.player == null) {
				this.initializePlayer(this.props.podcasts.trackList)
			}
			return
		}

		// reset the player when another podcast is selected
		if (this.state.player != null ) {
			this.state.player.pause()
			this.setState({
				player: null
			})
		}

		APIClient
			.get('/feed', {url: feedUrl})
			.then(response => {
				const podcast = response.podcast
				const item = podcast.item
				let list = []

				item.forEach((track, i) => {
					let trackInfo = {}
					trackInfo['title'] = track.title[0]
					trackInfo['author'] = this.props.podcasts.selected.collectionName
					trackInfo['pic'] = this.props.podcasts.selected['artworkUrl600']
					
					let enclosure = track.enclosure[0]['$']
					trackInfo['url'] = enclosure['url']
					list.push(trackInfo)
				})
				this.props.trackListReady(list)
			})
			.catch(err => {
				console.log('Playlist - ERROR in componentDidUpdate: '+JSON.stringify(err))
			})
	}

	render(){
		return (
			<div>
				<div style={{paddingTop:64}} className="hero-header bg-mlb animated fadeindown">					
					<div className="p-20 animated fadeinup delay-1">
						<div style={{background: '#fff'}} id="player" className="aplayer"></div>
					</div>								 
				</div>

				<Title />
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
		podcastsReceived: (podcasts) => dispatch(actions.podcastsReceived(podcasts)),
		trackListReady: (list) => dispatch(actions.trackListReady(list))
	}
}

export default connect(stateToProps, dispatchToProps)(Playlist)