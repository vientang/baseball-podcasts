import React, { Component } from 'react'
import { Title } from './index'

export default (props) => {
	return (
		<div>
			<div className="menu-trigger z-depth-2"> 
        <div id="menu-icon">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <nav id="menu" className="menu">
        <div className="menu-navigation">
          <div className="full-menu collapsible">
            <div style={{paddingTop:64}} className="hero-header bg-mlb animated fadeindown">
              <div className="p-20 animated fadeinup delay-1">
                <div style={{background: '#fff'}} id="player" className="aplayer"></div>
              </div>
            </div>
            <Title />
          </div>
        </div>
      </nav>
		</div>
	)
}
// <ul className="full-menu collapsible">
//   <li><a href="shop.html" className="no-child">Shop</a></li>
//   <li><a href="news.html" className="no-child">News</a></li>
//   <li><a href="video.html" className="no-child">Video</a></li>
//   <li><a href="contact.html" className="no-child">Contact</a></li>
// </ul>