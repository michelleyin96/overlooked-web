import React, { Component } from 'react';
import Request from 'superagent';

import NavigationBar from '../components/NavigationBar';
import NewsTopicBar from '../components/NewsTopicBar';
import NewsArticleCell from '../components/NewsArticleCell';
import '../css/All.css';
import '../css/index.css';

class NewsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
      authenticated: false,
      activeTopic: "popular",
    }
  }

  componentWillMount() {
    const sessionID = localStorage.getItem('sessionID');
    const viewerName = localStorage.getItem('viewerName');

    if (!sessionID) {
      alert("Must be logged in to view articles.");
    }

    var topic = this.state.activeTopic;
    if ((topic == "popular") ||
        (topic == "human rights") ||
        (topic == "universities")) {
      topic = "all"
    }
    const articlesURL =
    "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/articles?topic="
    + topic + "&sessionID=" + sessionID;

    Request
      .get(articlesURL)
      .then(response => {
        this.setState({
          articles: response.body.body
        });
      });

    const userURL
      = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/info?sessionID=" + sessionID;

      Request
        .get(userURL)
        .then(response => {
          if (response.body.status == "Success") {
            var name = response.body.body.fName + " " + response.body.body.lName;
            localStorage.setItem('viewerName', name);
          }
          if (response.errorMessage) {
            alert("Could not retrieve user information.")
          }
        });
  }

  _newActiveTopic(topic) {
    if ((topic == "popular") ||
        (topic == "human rights") ||
        (topic == "universities")) {
      topic = "all"
    }
    const sessionID = localStorage.getItem('sessionID');
    if (!sessionID) {
      alert("Must be logged in to view articles.");
    }
    const articlesURL =
    "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/articles?topic="
    + topic + "&sessionID=" + sessionID;


    Request
      .get(articlesURL)
      .then(response => {
        this.setState({
          articles: response.body.body,
          activeTopic: topic,
        });
      });
  }

  render() {
    const sessionIDProp = localStorage.getItem("sessionID");
    const viewerNameProp = localStorage.getItem("viewerName");

    var default_articles = [];
    var articles =
      this.state.articles ? this.state.articles : default_articles;

    var articlesList = articles.map(function(article){
                        return <NewsArticleCell
                                title={article.title}
                                author={article.author}
                                date={article.dateAdded}
                                description={article.description}
                                url={article.articleURL}
                                img={article.imageURL}
                                comments={article.comments}
                                likes={article.likes}
                                shares={article.shares}
                                articleID={article.articleID}
                                sessionID={sessionIDProp}
                                viewerName={viewerNameProp}
                                viewerHasLiked={article.userHasLiked}
                                viewerHasShared={article.userHasShared}
                              />;
                      });

    return (
    	<div className="news-page">
    		<NavigationBar />
        <NewsTopicBar updateTopic={ this._newActiveTopic.bind(this) }/>
      	<div className="container article-container">
      		{articlesList}
      	</div>
      </div>
    );
  }
}

export default NewsPage;