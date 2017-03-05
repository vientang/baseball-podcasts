import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Podcasts extends Component {
	constructor(props) {
		super(props)		
	}

	selectPodcast(podcast, event) {
		// console.log("Podcast selected", JSON.stringify(podcast))
		this.props.podcastSelected(podcast)
	}

	render() {
		const list = this.props.podcasts.all || []

		// console.log("List is ", list)
		return (
			<div>
				{this.props.podcasts.all && list.response.map((podcast, i) => {
						return (
							<div key={i} className="shop-banner animated fadeinup delay-2">
				        <a href="#" onClick={this.selectPodcast.bind(this, podcast)}>
				          <img src={podcast.artworkUrl600} alt="" />
				          <div className="opacity-overlay valign-wrapper">
				            <div className="valign center width-100">
				              <p className="white-text">podcast.collectionName</p>
				            </div>
				          </div>
				        </a>
				      </div>
			      )
					}) 
				}
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
		podcastSelected: (podcast) => dispatch(actions.podcastSelected(podcast))
	}
}

export default connect(stateToProps, dispatchToProps)(Podcasts)