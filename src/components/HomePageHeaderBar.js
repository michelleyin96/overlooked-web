import React, { Component } from 'react';
import logo from '../img/Logo-white.png';

class HomePageHeaderBar extends Component {
	render() {
    return (
  		<nav className="navbar navbar-fixed-top">
  		  <div className="container wrapper">
  		    <img className="logo" src={logo} />
  		    <form className="login">
  		    	<div className="form-group float-right">
  		    		<input id="email" type="text" className="email" name="email" placeholder="Email" />
  		    		<input id="password" type="password" className="password" name="password" placeholder="Password" />
  		    		<input className="button-primary login-button" type="submit" value="Log In" />
  		    	</div>
  		    	<a className="u-pull-right forgot-pass">Forgot password?</a>
  		    </form>
  		  </div>
  		</nav>
    )
	}
}

export default HomePageHeaderBar