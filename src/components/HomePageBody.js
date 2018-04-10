import React, { Component } from 'react';
import {
  withRouter
} from "react-router-dom";
import Request from 'superagent';
import firebase, { auth, googleAuth } from '../firebase';

import ArticleCell from './ArticleCell';
import HomePageHeaderBar from './HomePageHeaderBar';
import facebookIcon from '../img/facebook.png';
import googleIcon from '../img/google-plus.png';
import logo from '../img/Logo-white.png';

const HomePageArticles = "home-page-articles";

class HomePageBody extends Component {

  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
      authenticatedUser: null,
      fname: '',
      lname: '',
      email: '',
      pwd: '',
    }
    this.createAccount = this.createAccount.bind(this);
    this.fNameChange = this.fNameChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.pwdChange = this.pwdChange.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  componentWillMount() {
    if(this.state.authenticatedUser) {
      this.props.history.push("/news");
      return;
    }
    const appTokenKey = localStorage.getItem(appTokenKey)
    if (appTokenKey) {
        this.props.history.push("/news");
        return;
    }

    const articlesURL =
    "https://c29wreqr05.execute-api.us-west-1.amazonaws.com/test/client/articledata?articleID=1&topic=all&numArticles=10&direction=DESC"

    const cachedArticles = sessionStorage.getItem(HomePageArticles);
    if (cachedArticles) {
      this.setState({ articles: JSON.parse(cachedArticles) });
      return;
    }

    Request
      .get(articlesURL)
      .then(response => {
        sessionStorage.setItem(HomePageArticles, JSON.stringify(response.body.body));
        this.setState({ articles: response.body.body });
      });
  }

  /**
   * Enables Google+ Login
   */
  handleGoogleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      alert(error.message)
    });

    this.props.history.push("/news")
  }

  /**
   * Enables Facebook Login
   */
  handleFacebookLogin() {
    alert("redirect");
    this.props.history.push("/news")
  }

  /**
   * Update first name field
   */
  fNameChange(event) {
    this.setState({ fname: event.target.value });
  }

  /**
   * Update last name field
   */
  lNameChange(event) {
    this.setState({ lname: event.target.value });
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
   * Redirect to news page
   */
  redirectToHome() {
    this.props.history.push("/news")
  }

  /**
   * Creates a new account.
   *
   */
  createAccount() {
    var email = this.state.email
    var password = this.state.pwd
    var name = this.state.fname + " " + this.state.lname

    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: name,
        }).then(() => {
          this.setState({ authenticatedUser: user });
          localStorage.setItem("authToken", user.uid)
          this.props.history.push("/news")
        }).catch(function(error) {
          alert(error.message)
        });
    }, function(error) {
        alert(error.message)
        var errorCode = error.code;
        var errorMessage = error.message;
    });
  }

  render() {
    const { match, location, history } = this.props
    var articles = this.state.articles ? this.state.articles : [];
    var articlesList = articles.map(function(article){
                        return <ArticleCell
                                title={article.title}
                                author={article.author}
                                date={article.dateAdded}
                                description={article.description}
                                url={article.articleURL}
                                img={article.imageURL}
                              />;
                      });

    return (
      <div className="homepage-body">
        <div className="row">
          <div className="six columns left-container">
            <img className="logo" src={logo} />
            <h4 className="value-prop">The social news network.</h4>
            <div className="articles-preview">
            {articlesList}
            </div>
          </div>
          <div>
          <div className="six columns right-container u-pull-right">
            <HomePageHeaderBar />
            <h4>Create an account</h4>
            <h6>Or sign up with social</h6>
            <div className="social-buttons">
              <button className="social facebook" onClick={ this.handleFacebookLogin }>
                <div className="img-wrapper">
                  <img className="social-icon" src={facebookIcon} alt="google"/>
                </div>
              </button>
              <button className="social google" onClick={ this.handleGoogleLogin }>
                <div className="img-wrapper">
                  <img className="social-icon" src={googleIcon} alt="google"/>
                </div>
              </button>
            </div>
            <div className="signup-form">
              <div className="row">
                <div className="twelve columns">
                  <input
                    className="u-full-width"
                    type="text"
                    placeholder="First Name"id="fname"
                    value={this.state.fname}
                    onChange={this.fNameChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input
                    className="u-full-width"
                    type="text"
                    placeholder="Last Name"
                    id="lname"
                    value={this.state.lname}
                    onChange={this.lNameChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input
                    className="u-full-width"
                    type="text"
                    placeholder="Email Address"
                    id="email"
                    value={this.state.email}
                    onChange={this.emailChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input
                    className="u-full-width"
                    type="password"
                    placeholder="Password"
                    id="pwd"
                    value={this.state.pwd}
                    onChange={this.pwdChange}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Create Account"
                className="u-pull-right light-button"
                id="pwd"
                onClick={this.createAccount}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(HomePageBody);