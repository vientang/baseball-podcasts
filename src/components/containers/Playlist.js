import React, { Component} from 'react'
import { Search } from '../presentation'
import { APIClient } from '../../utils'
import { connect } from 'react-redux'
import APlayer from 'aplayer'
import actions from '../../actions'

class Playlist extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tracklist: []
		}
		this.searchPodcasts = this.searchPodcasts.bind(this)
	}

	componentDidMount() {
		var ap1 = new APlayer({
	    element: document.getElementById('player'),
	    narrow: false,
	    autoplay: true,
	    showlrc: false,
	    mutex: true,
	    theme: '#e6d0b2',
	    preload: 'metadata',
	    mode: 'circulation',
	    music: [
	    	{
	        title: 'Preparation',
	        author: 'Hans Zimmer/Richard Harvey',
	        url: 'http://devtest.qiniudn.com/Preparation.mp3',
	        pic: 'http://devtest.qiniudn.com/Preparation.jpg'
	    	}
	    ]
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
				console.log('Playlist - ERROR in searchPodcasts: '+JSON.stringify(err))
			})
	}

	componentDidUpdate() {
		// console.log("componentDidUpdate: "+JSON.stringify(this.props.podcasts.selected))
		const selected = this.props.podcasts.selected
		if (!selected) return
		// feedUrl needs to come after the above statement or there will be an error
		const feedUrl = this.props.podcasts.selected.feedUrl
		if (!feedUrl) return

		const endpoint = '/feed'
		APIClient
			.get(endpoint, {url: feedUrl})
			.then(response => {
				const podcast = response.podcast
				const item = podcast.item
				let list = []

				item.forEach((track, i) => {
					let trackInfo = {}
					trackInfo['title'] = 'Title' + i
					trackInfo['author'] = 'Author' + i
					trackInfo['pic'] = 'http://www.podcastonesales.com/images/logos/pod_PMT_2_1400.jpg'
					
					let enclosure = track.enclosure[0]['$']
					trackInfo['url'] = enclosure.url
					list.push(trackInfo)
				});
				console.log('Playlist - componentDidUpdate: '+JSON.stringify(list))
				this.setState({tracklist: list})
			})
			.catch(err => {
				console.log('Playlist - ERROR in componentDidUpdate: '+JSON.stringify(err))
			})
	}

	render(){
		return (
			<div>
				<div style={{paddingTop:64}}className="hero-header bg-shop animated fadeindown">
					<div className="p-20 animated fadeinup delay-1">
						<div style={{background: '#fff'}} id="player" className="aplayer"></div>
					</div>								 
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