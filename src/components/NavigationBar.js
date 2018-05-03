import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Link
} from "react-router-dom";
import Request from 'superagent';
import firebase from '../firebase';
import logo from '../img/eyes.png';
import overlooked from '../img/name.png';
import SearchIcon from 'react-icons/lib/fa/search';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: "",
    }
    this.logOut = this.logOut.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.performSearch = this.performSearch.bind(this);
  }

  /**
   * Check if enter pressed
   */
  checkEnter(event) {
    if (event.keyCode === 13) {
      this.performSearch();
    }
  }

  /**
   * Log out user
   */
  logOut() {
    firebase.auth().signOut().then(() => {
      sessionStorage.removeItem("sessionID");
      this.props.history.push("/");
    }).catch(function(error) {
      alert(error.message)
    });
  }

  /**
   * Search key change
   */
  searchChange(event) {
    if (event.keyCode == 13) {
      console.log(event + " enter ")
    }
    this.setState({ searchTerms: event.target.value });
  }

  /**
   * Search
   */
  performSearch(event) {
    const searchURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/search-func?";
    const searchTerms = this.state.searchTerms;

    Request
      .post(searchURL)
      .send({"params" :
              {
                "keywords": searchTerms,
              }
            })
      .then(response => {
        if (response.body.status == "Success") {
          this.props.history.push({
            pathname: '/searchresults',
            state: { users: response.body.body.users, articles: response.body.body.articles }
          })
        } else {
          return;
        }
      })
  }

	render() {
    return (
  		<nav className="navigation navbar-fixed-top">
  		  <div className="wrapper">
          <div className="logo">
            <img src={logo} id="eyes" alt="looks" />
          </div>
          <div className="searchbar">
            <input
              type="text"
              id="search"
              className="search-bar"
              onChange={this.searchChange}
              value={this.state.searchTerms}
              onKeyUp={this.checkEnter}
              placeholder={"Search..."}
            />
            <div class="submit-search" onClick={this.performSearch}>
              <SearchIcon size={18}/>
            </div>
          </div>
          <div className="logo-wrapper">
            <img src={overlooked} className="overlooked vertical-center" alt="overlooked"/>
          </div>
          <div className="right-nav u-pull-right vertical-container">
            <div className="right-nav-item vertical-container-child">
              <Link to="/news" className="link">News</Link>
            </div>
            <div className="right-nav-item vertical-container-child">
              <Link to="/looks" className="link">Looks</Link>
            </div>
            <div className="right-nav-item vertical-container-child">
              <Link to="/myprofile" className="link">Profile</Link>
            </div>
            <div className="right-nav-item vertical-container-child">
              <Link to="/settings" className="link">Settings</Link>
            </div>
            <div className="right-nav-item vertical-container-child" onClick={ this.logOut }>Log Out</div>
          </div>  
  		  </div>
  		</nav>
    )
	}
}

export default withRouter(NavigationBar)