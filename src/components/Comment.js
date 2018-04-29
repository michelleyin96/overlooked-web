import React, { Component } from 'react';
import moment from 'moment';
import {
  browserHistory,
  withRouter
} from "react-router-dom";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.viewProfile = this.viewProfile.bind(this);
  }

  /**
   * Redirect to profile page.
   */
  viewProfile(event) {
    this.props.history.push({
      pathname: '/profile',
      state: { viewerID: this.props.authorID }
    })
  }

  render() {
    const date = moment(this.props.date).format('MMM DD, YYYY');
    return (
      <div className="comment">
        <h6 className="comment-author" onClick={ this.viewProfile }>{ this.props.author }</h6>
        <h6 className="comment-date">{" · " + date } </h6>
        <p className="comment-body">{ this.props.body }</p>
      </div>
    )
	}
}

export default withRouter(Comment)