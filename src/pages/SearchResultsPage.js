import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import User from '../components/User';
import NewsArticleCell from '../components/NewsArticleCell';
import '../css/All.css';
import '../css/index.css';


class SearchResultsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: this.props.location.state.users,
			articles: this.props.location.state.articles,
		}
	}

	componentWillReceiveProps(nextProps) {
	  if (JSON.stringify(this.props) != JSON.stringify(nextProps)) {
	    this.setState({ users: nextProps.location.state.users, articles: nextProps.location.state.articles });
	  }
	}

  render() {
  	const viewerName = localStorage.getItem('viewerName');
  	const sessionID = localStorage.getItem('sessionID');
  	var showUsers = false;
  	var showArticles = false;


  	var users = [];
  	users = this.state.users ? this.state.users : [];

  	var userResults = users.map(function(user){
  	                    return <User
  	                    					sessionID={user.sessionID}
  	                    					fName={user.fName}
  	                    					lName={user.lName}
  	                    				/>
  	                  });
  	if (users.length > 0) {
  		showUsers = true;
  	}

    console.log(users)

  	var articles = [];
  	articles = this.state.articles ? this.state.articles : [];

  	var articleResults = articles.map(function(article){
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
	  	                            sessionID={sessionID}
	  	                            viewerName={viewerName}
	  	                            viewerHasLiked={true}
	  	                            viewerHasShared={true}
	  	                          />;
	  	                  });

    var title = "Top Results";                   
  	if (articles.length > 0) {
  		showArticles = true;
  	}

    if (!showUsers && !showArticles) {
      title = "No Results";
    }

    return (
        <div className="search-result-page">
          <NavigationBar />
          <div className="results-container container">
          	<h5 className="header">{ title }</h5>
          	{ showUsers &&
          		<div className="user-results results">
          			<h6 className="title">Users</h6>
          			{ userResults }
          		</div>
          	}
          	{ showArticles && 
          		<div className="news-results">
          			<h6 className="title">Articles</h6>
          			{ articleResults }
          		</div>
          	}
          </div>
        </div>
    );
  }
}

export default SearchResultsPage;