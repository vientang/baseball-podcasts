import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Featured } from './components/layout'

class App extends Component {
	render() {
		return (
			<Featured />
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'))