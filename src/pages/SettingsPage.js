import React, { Component } from 'react';
import EditProfile from '../components/EditProfile';
import NavigationBar from '../components/NavigationBar';
import '../css/All.css';
import '../css/index.css';


class Settings extends Component {
  render() {
    return (
        <div className="profile-page settings-page">
          <NavigationBar />
          <EditProfile/>
        </div>
    );
  }
}

export default Settings;