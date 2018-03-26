import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import firebase from '../firebase';
import logo from '../img/eyes.png';
import overlooked from '../img/name.png'

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  /**
   * Log out user
   */
  logOut() {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem("authToken");
      this.props.history.push("/");
    }).catch(function(error) {
      alert(error.message)
    });
  }

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
          <div className="right-nav u-pull-right">
            <div onClick={ this.logOut }>Log Out</div>
          </div>  
  		  </div>
  		</nav>
    )
	}
}

export default withRouter(NavigationBar)