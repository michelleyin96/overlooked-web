import React, { Component } from 'react';
import Request from 'superagent';

import NavigationBar from '../components/NavigationBar';
import PostActivity from '../components/PostActivity';
import ShareActivity from '../components/ShareActivity';
import CommentActivity from '../components/CommentActivity';
import '../css/All.css';
import '../css/index.css';

class LooksPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    return (
    	<div className="looks-page">
    		<NavigationBar />
        <div className="looks-feed">
          <PostActivity />
          <ShareActivity />
          <CommentActivity />
          <PostActivity />
          <ShareActivity />
          <CommentActivity />
        </div>
      </div>
    );
  }
}

export default LooksPage;