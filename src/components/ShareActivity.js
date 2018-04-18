import React, { Component } from 'react';
import NewsArticleCell from './NewsArticleCell';

class ShareActivity extends Component {
	render() {
    return (
      <div className="article-share">
        <div className="title">
          <span className="name space">George Sehremelis</span>
          <span className="action space">shared</span>
          <span className="article-title space">Article Title</span>
        </div>
        <div className="date">Sept 18, 2017</div>
        <NewsArticleCell
          title={"ARTICLE TITLE"}
          author={"Author Lastname"}
          date={"Sept 18, 2017"}
          description={"asdfasdfasdfa"}
          url={"http://www.abc.net.au/news/2018-03-07/bitcoin-sports-bet-site-under-acma-probe-after-wilkie-complaint/9510512"}
          img={"http://www.abc.net.au/news/image/5487174-16x9-700x394.jpg"}
          comments={[{"sessionID": 41245, "fName": "Jason", "lName": "Witherspoon", "commentID": 1, "content": "THIS IS A TEST COMMENT", "dateAdded": "2017-12-25 23:59:59"}]}
          likes={[{"sessionID": 41245, "fName": "Jason", "lName": "Witherspoon", "dateAdded": "2017-12-25 23:59:59"}]}
          shares={[{"sessionID": 41245, "fName": "Jason", "lName": "Witherspoon", "dateAdded": "2017-12-25 23:59:59"}]}
          articleID={"1"}
          nested={"true"}
        />
      </div>
    )
	}
}

export default ShareActivity