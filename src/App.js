import { BrowserRouter } from 'react-router-dom'
import React, { Component } from 'react';
import HomePageHeaderBar from './components/HomePageHeaderBar';
import HomePageBody from './components/HomePageBody';
import logo from './img/Logo-white.png';
import facebookIcon from './img/facebook.png';
import googleIcon from './img/google-plus.png';
import './css/All.css';


class App extends Component {
  render() {
    return (
        <div>
          <HomePageHeaderBar />
          <HomePageBody />
        </div>
    );
  }
}

export default App;
