import React, { Component } from 'react';
import logo from '../img/eyes.png';
import overlooked from '../img/name.png'

class NavigationBar extends Component {
	render() {
    return (
  		<nav className="navigation navbar-fixed-top">
  		  <div className="wrapper">
          <div className="logo">
            <img src={logo} id="eyes" alt="looks" />
          </div>
          <div className="logo-wrapper">
            <img src={overlooked} className="overlooked vertical-center" alt="overlooked"/>
          </div>  
  		  </div>
  		</nav>
    )
	}
}

export default NavigationBar