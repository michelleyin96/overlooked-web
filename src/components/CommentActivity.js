import React, { Component } from 'react';
import moment from 'moment';
import {
  browserHistory,
  withRouter
} from "react-router-dom";
import NewsArticleCell from './NewsArticleCell';

class CommentActivity extends Component {
  constructor(props) {
    super(props);
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

    const viewerName = localStorage.getItem('viewerName');

    return (
      <div className="article-comment">
        <div className="title">
          <span className="name space" onClick={ this.viewProfile }>{ this.props.displayName }</span>
          <span className="action space">commented on</span>
          <span className="article-title space">{ this.props.articleInfo.title }</span>
        </div>
        <div className="date">{date}</div>
        <div className="comment-text">{this.props.content}</div>
        <NewsArticleCell
          title={this.props.articleInfo.title}
          author={this.props.articleInfo.author}
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

export default withRouter(CommentActivity)