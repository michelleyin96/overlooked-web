import React, { Component } from 'react';
import Request from 'superagent';
import firebase from '../firebase';
import NavigationBar from '../components/NavigationBar';
import Profile from '../components/Profile';
import '../css/All.css';
import '../css/index.css';

class ResetPasswordPage extends Component {
	constructor(props) {
		super(props)
    this.state = {
      email: '',
      showSuccess: false,
    }
    this.emailChange = this.emailChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
	}


  /**
   * Update password field
   */
  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  /**
   * Send password email link
   */
  resetPassword(event) {
    var email = this.state.email;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      this.setState({ success: true })
    }).catch((error) => {
      this.setState({ success: false })
      alert(error.message);
    });
  }

  render() {
    const showSuccess = this.state.success ? (<p className="message">A reset link has been sent to your email.</p>)
                                           : (<div></div>);
    return (
      <div className="container">
        <div className="password-container border">
          <h3>Forgot Password?</h3>
          <h6>Enter your email to receive a link to reset.</h6>
          <input
            id="email"
            type="text"
            className="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.emailChange}
          />
          <input
            className="button login-button"
            type="submit"
            value="Email Link"
            onClick={this.resetPassword}
          />
          { showSuccess }
        </div>
      </div>
    );
  }
}

export default ResetPasswordPage