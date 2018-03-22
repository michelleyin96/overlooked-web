import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import Request from 'superagent';
import firebase from '../firebase.js';
import ArticleCell from './ArticleCell';
import facebookIcon from '../img/facebook.png';
import googleIcon from '../img/google-plus.png';

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
      authenticated: false
    }
  }

  componentWillMount() {
    const articlesURL =
    "https://c29wreqr05.execute-api.us-west-1.amazonaws.com/test/client/articles?articleID=1&topic=all&numArticles=10&direction=DESC"

    Request
      .get(articlesURL)
      .then(response => {
        this.setState({
          articles: response.body.body
        });
      });
  }

  logInWithGoogle() {
    alert("redirect");
    this.props.history.push("/news")
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
                  <input className="u-full-width" type="text" placeholder="First Name" />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input className="u-full-width" type="text" placeholder="Last Name" />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input className="u-full-width" type="text" placeholder="Email Address" />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input className="u-full-width" type="password" placeholder="Password" />
                </div>
              </div>
              <input type="submit" value="Create Account" className="u-pull-right light-button"/>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default HomePageBody;