import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import firebase from '../firebase';
import logo from '../img/Logo-white.png';

class HomePageHeaderBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      pwd: '',
    }
    this.logInUser = this.logInUser.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.pwdChange = this.pwdChange.bind(this);
  }

  /**
   * Update email field
   */
  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  /**
   * Update password field
   */
  pwdChange(event) {
    this.setState({ pwd: event.target.value });
  }

  /**
   * Logs user in.
   */
  logInUser() {
    var email = this.state.email
    var password = this.state.pwd

    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      var user = firebase.auth().currentUser;
      this.setState({ authenticatedUser: user});
      localStorage.setItem("authToken", user.uid);
      this.props.history.push("/news");
    }, function(error) {
      alert(error.message);
    });
  }

	render() {
    return (
  		  <div className="wrapper">
  		    <div className="login">
  		    	<div className="form-group">
  		    		<input
                id="email"
                type="text"
                className="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.emailChange}
              />
  		    		<input
                id="password"
                type="password"
                className="password"
                name="password"
                placeholder="Password"
                value={this.state.pwd}
                onChange={this.pwdChange}
              />
  		    		<input
                className="button-primary login-button u-pull-right"
                type="submit"
                value="Log In"
                onClick={this.logInUser}
              />
  		    	</div>
  		    	<a className="u-pull-right forgot-pass">Forgot password?</a>
  		    </div>
  		  </div>
    )
	}
}

export default withRouter(HomePageHeaderBar)