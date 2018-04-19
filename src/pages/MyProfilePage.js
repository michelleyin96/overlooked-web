import React, { Component } from 'react';
import Request from 'superagent';

import NavigationBar from '../components/NavigationBar';
import Profile from '../components/Profile';
import '../css/All.css';
import '../css/index.css';

class MyProfilePage extends Component {
	constructor(props) {
		super(props)
	}

  render() {
    return (
      <div className="profile-page">
        <NavigationBar />
        <Profile />
      </div>
    );
  }
}

export default MyProfilePage