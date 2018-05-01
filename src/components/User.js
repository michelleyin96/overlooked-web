import React, { Component } from 'react';
import {
  browserHistory,
  withRouter
} from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionID: this.props.sessionID,
      fName: this.props.fName,
      lName: this.props.lName,
    }
    this.viewProfile = this.viewProfile.bind(this);
  }

  viewProfile(event) {
    if (this.props.sessionID) {
      this.props.history.push({
        pathname: '/profile',
        state: { viewerID: this.state.sessionID }
      })
    }
  }

	render() {
    return (
      <div className="user" onClick={this.viewProfile}>{ this.state.fName + " " + this.state.lName}</div>
    );
	}
}

export default withRouter(User)