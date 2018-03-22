import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Request from 'superagent';
import firebase from '../firebase';

import ArticleCell from './ArticleCell';
import facebookIcon from '../img/facebook.png';
import googleIcon from '../img/google-plus.png';

const HomePageArticles = "home-page-articles";

const GoogleButton = withRouter(
  ({ history }) =>
    <button className="social google" onClick={() => {
            history.push("/news");
          }}>
      <div className="img-wrapper">
        <img className="social-icon" src={googleIcon} alt="google"/>
      </div>
    </button>
);

const FacebookButton = withRouter(
  ({ history }) =>
    <button className="social facebook" onClick={() => {
            history.push("/news");
          }}>
      <div className="img-wrapper">
        <img className="social-icon" src={facebookIcon} alt="facebook"/>
      </div>
    </button>
);

class HomePageBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
      authenticated: false,
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
  }

  componentWillMount() {
    const articlesURL =
    "https://c29wreqr05.execute-api.us-west-1.amazonaws.com/test/client/articles?articleID=1&topic=all&numArticles=10&direction=DESC"

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
  logInWithGoogle() {
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
   * Creates a new account.
   *
   */
  createAccount() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd).catch(function(error) {
      // Handle Errors here.
      alert(error.message)
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  render() {
    // const { from } = this.props.location.state || '/news'
    // const { fireRedirect } = this.state

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
      <div className="container homepage-body">
        <div className="row">
          <div className="six columns left-container">
            <h2>The social news</h2>
            <h2> network.</h2>
            <div className="articles-preview">
            {articlesList}
            </div>
          </div>
          <div>
          <div className="six columns u-pull-right">
            <h4>Create an account</h4>
            <h6>Or sign up with social</h6>
            <div className="social-buttons">
              <FacebookButton />
              <GoogleButton />
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

export default HomePageBody;