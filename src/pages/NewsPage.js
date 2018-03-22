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

  render() {
    var articles = this.state.articles ? this.state.articles : [];
    var articlesList = articles.map(function(article){
                        return <NewsArticleCell
                                title={article.title}
                                author={article.author}
                                date={article.dateAdded}
                                description={article.description}
                                url={article.articleURL}
                                img={article.imageURL}
                              />;
                      });

    return (
    	<div className="news-page">
    		<NavigationBar />
        <NewsTopicBar />
      	<div className="container article-container">
      		{articlesList}
      	</div>
      </div>
    );
  }
}

export default NewsPage;