import React, { Component } from 'react';
import Request from 'superagent';

import NavigationBar from '../components/NavigationBar';
import NewsTopicBar from '../components/NewsTopicBar';
import NewsArticleCell from '../components/NewsArticleCell';
import '../css/All.css';

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
    var topic = this.state.activeTopic;
    if ((topic == "popular") ||
        (topic == "human rights") ||
        (topic == "universities")) {
      topic = "all"
    }
    const articlesURL =
    "https://c29wreqr05.execute-api.us-west-1.amazonaws.com/test/client/articledata?articleID=1&topic="
    + topic + "&numArticles=%22%22&direction=DESC"

    Request
      .get(articlesURL)
      .then(response => {
        this.setState({
          articles: response.body.body
        });
      });
  }

  _newActiveTopic(topic) {
    if ((topic == "popular") ||
        (topic == "human rights") ||
        (topic == "universities")) {
      topic = "all"
    }
    const articlesURL =
    "https://c29wreqr05.execute-api.us-west-1.amazonaws.com/test/client/articledata?articleID=1&topic="
    + topic + "&numArticles=%22%22&direction=DESC"

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