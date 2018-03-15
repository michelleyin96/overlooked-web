import React, { Component } from 'react';
import Request from 'superagent';

import ArticleCell from './ArticleCell'
import facebookIcon from '../img/facebook.png';
import googleIcon from '../img/google-plus.png';

class HomePageBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

  componentWillMount() {
    const articlesURL =
    "https://c29wreqr05.execute-api.us-west-1.amazonaws.com/test/client/articles?articleID=1&topic=all&numArticles=10&direction=DESC"

    let currentComponent = this;

    Request
      .get(articlesURL)
      .then(response => {
        this.setState({
          articles: response.body.body
        });
      });
  }

  render() {
    console.log(this.state.articles)
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
          <div className="six columns">
            <h4>Create an account</h4>
            <h6>Or sign up with social</h6>
            <div className="social-buttons">
              <div className="social facebook">
                <div className="img-wrapper">
                  <img className="social-icon" src={facebookIcon} />
                </div>
              </div>
              <div className="social google">
                <div className="img-wrapper">
                  <img className="social-icon" src={googleIcon} />
                </div>
              </div>
            </div>
            <div className="signup-form">
              <div className="row">
                <div className="six columns">
                  <input className="u-full-width" type="text" placeholder="First Name" id="exampleEmailInput" />
                </div>
                <div className="six columns">
                  <input className="u-full-width" type="text" placeholder="Last Name" id="exampleEmailInput" />
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input className="u-full-width" type="text" placeholder="Email Address" id="exampleEmailInput"/>
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <input className="u-full-width" type="password" placeholder="Password" id="exampleEmailInput"/>
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