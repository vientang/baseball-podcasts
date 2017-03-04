import React, { Component } from 'react'
import { Search } from '../presentation'
import { APIClient } from '../../utils'

class Playlist extends Component {
	constructor(props) {
		super(props)
		this.searchPodcasts = this.searchPodcasts.bind(this)
	}

	searchPodcasts(event) {
		if (event.keyCode !== 13) {
			return
		}
		const endpoint = `/search/${event.target.value}`
		// search endpoint http://localhost:3000/search/baseball
		APIClient.get(endpoint, null)
			.then(response => {
				console.log("Response is", JSON.stringify(response))
			})
			.catch(err => {
				console.log("ERROR is", JSON.stringify(response))
			})
	}

	render() {
		return (
			<div id="content" className="main animated fadein">
        <div className="hero-header bg-shop animated fadeindown">
          <h1 className="hero-title">Playlist</h1>        	
        </div>
        <Search onSearch={this.searchPodcasts}/>
      </div>
		)
	}
}

export default Playlist