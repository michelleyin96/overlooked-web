import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import NewsTopicBar from '../components/NewsTopicBar';
import '../css/All.css';


class NewsPage extends Component {
  render() {
    return (
    	<div className="news-page">
    		<NavigationBar />
        	<NewsTopicBar />
        </div>
    );
  }
}

export default NewsPage;