import React, { Component } from 'react';
import moment from 'moment';
import NewsArticleCell from './NewsArticleCell';

class ShareActivity extends Component {
  constructor(props) {
    super(props)
     this.viewProfile = this.viewProfile.bind(this);
  }

  /**
   * Redirect to profile page.
   */
  viewProfile(event) {
    if (this.props.commentAuthorID) {
      this.props.history.push({
        pathname: '/profile',
        state: { viewerID: this.props.commentAuthorID }
      })
    }
  }

	render() {
    var dateAdded = this.props.articleInfo.dateAdded;
    const date = moment(dateAdded).format('MMM DD, YYYY');
    var context = "";
    if (this.props.type == "Like") {
      context = "liked";
    } else {
      context = "shared";
    }

    const viewerName = localStorage.getItem('viewerName');

    return (
      <div className="article-share">
        <div className="title">
          <span className="name space" onClick={this.props.viewProfile}>{ this.props.displayName }</span>
          <span className="action space">{ context }</span>
          <span className="article-title space">{ this.props.articleInfo.title }</span>
        </div>
        <div className="date">{date}</div>
        <NewsArticleCell
          title={this.props.articleInfo.title}
          author={this.props.articleInfo.autho}
          date={date}
          description={this.props.articleInfo.description}
          url={this.props.articleInfo.articleURL}
          img={this.props.articleInfo.imageURL}
          comments={this.props.articleInfo.comments}
          likes={this.props.articleInfo.likes}
          shares={this.props.articleInfo.shares}
          articleID={"1"}
          nested={"true"}
          viewerName={ viewerName }
          viewerHasLiked={this.props.articleInfo.userHasLiked}
          viewerHasShared={this.props.articleInfo.userHasShared}
        />
      </div>
    )
	}
}

export default ShareActivity