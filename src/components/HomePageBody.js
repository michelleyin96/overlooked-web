import React, { Component } from 'react';
import {
  browserHistory,
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
    this.redirectToHome = this.redirectToHome.bind(this);
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
    "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/articles?articleID=1&topic=all&numArticles=%22%22&direction=DESC&sessionID=0"

    Request
      .get(articlesURL)
      .then(response => {
        localStorage.setItem(HomePageArticles, JSON.stringify(response.body.body));
        this.setState({ articles: response.body.body });
      });
  }

  /**
   * Enables Google+ Login
   */
  handleGoogleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        var token = result.credential.accessToken;
        var name = result.user.displayName;
        var email = result.user.email;
        var firebaseID = result.user.uid;
        var nameArr = name.split(" ");

        Request
          .post('https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/info?')
          .send({"params" :
                  {
                    "firebaseID": firebaseID, 
                    "email": email,
                    "fName": nameArr[0],
                    "lName": nameArr[1],
                    "bio": "",
                    "profilePic" : "",
                  }
                })
          .then(response => {
            if (response.body.status == "Success") {
              localStorage.setItem("sessionID", response.body.body);
              this.props.history.push("/news");
            } else if (response.body.status == "Failure") {
              alert("Failed to log in.");
              return;
            }
          })
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message + " Facebook Login Failed.";
        var email = error.email;
        var credential = error.credential;
        alert(errorMessage);
      });
  }

  /**
   * Enables Facebook Login
   */
  handleFacebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      var token = result.credential.accessToken;
      var name = result.user.displayName;
      var email = result.user.email;
      var firebaseID = result.user.uid;
      var nameArr = name.split(" ");

      Request
        .post('https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/info?')
        .send({"params" :
                {
                  "firebaseID": firebaseID, 
                  "email": email,
                  "fName": nameArr[0],
                  "lName": nameArr[1],
                  "bio": "",
                  "profilePic" : "",
                }
              })
        .then(response => {
          if (response.body.status == "Success") {
            localStorage.setItem("sessionID", response.body.body);
            this.props.history.push("/news");
          } else if (response.body.status == "Failure") {
            alert("Failed to log in.");
            return;
          }
        })
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message + " Facebook Login Failed.";
      var email = error.email;
      var credential = error.credential;
      alert(errorMessage);
    });
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
    var email = this.state.email;
    var password = this.state.pwd;
    var fname = this.state.fname;
    var lname = this.state.lname;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        var user = firebase.auth().currentUser;
        Request
          .post('https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/info?')
          .send({"params" :
                  {
                    "firebaseID": user.uid, 
                    "email": email,
                    "fName": fname,
                    "lName": lname,
                    "bio": "",
                    "profilePic" : "",
                  }
                })
          .then(response => {
            if (response.body.errorMessage) {
              alert("Unsuccessful");
            }
            if (response.body.status == "Success") {
              localStorage.setItem("sessionID", response.body.body);
              this.props.history.push("/news");
            } else if (response.body.status == "Failure") {
              alert("Failed to log in.");
              return;
            }
          })
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
            { /*
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
            */}
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