import React, { Component } from 'react';
import Request from 'superagent';
import moment from 'moment'
import Comment from './Comment';
import Like from 'react-icons/lib/fa/heart-o';
import Share from 'react-icons/lib/fa/retweet';
import ShowMore from 'react-icons/lib/fa/angle-down';
 

class NewsArticleCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
    }

    this.toggleComments = this.toggleComments.bind(this);
    this.likeArticle = this.likeArticle.bind(this);
  }

  /**
   * Toggle showing of comments for article.
   */
  toggleComments(event) {
    const showComments = this.state.showComments;
    this.setState({ showComments: !showComments });
  }

  /**
   * Send POST request to like an article.
   */
  likeArticle(event) {
    alert("sending")
    Request.post('https://c29wreqr05.execute-api.us-west-1.amazonaws.com/test/client/articles/likes')
      .send({"userID" : "1", "articleID" : "1"})
      .then(response => {
        console.log("hello")
        console.log(response)
        alert("success")
      });
  }

	render() {
    const date = moment(this.props.date).format('MMM DD, YYYY');
    const context = this.props.author + " · " + date;
    const numLikes = this.props.likes.length;
    const numShares = this.props.shares.length;
    var comments = this.props.comments;
    var commentList = comments.map(function(comment){
                        return <Comment
                                  author={"John Doe"}
                                  body={comment.content}
                                />;
                      });

    return (
      <div className="post">
        <div className="article-wrapper">
      		<a href={this.props.url} className="article-container" target="_blank">
            <div class="row">
              <img src={this.props.img} className="article-imgurl four columns" />
              <div className="article eight columns">
                <h6>{this.props.title}</h6>
                <span>{context}</span>
                <p className="description">{this.props.description}</p>
              </div>
            </div>
          </a>
          <div className="reaction-container">
            <div className="reaction like-container vertical-container u-pull-left" onClick={this.likeArticle}>
              <Like size={18} className="like-icon vertical-container-child"/>
              <div className="num-likes vertical-container-child">{numLikes}</div>
            </div>
            <div className="reaction share-container vertical-container u-pull-left">
              <Share size={20} className="like-icon u-pull-left vertical-container-child"/>
              <div className="num-likes vertical-container-child">{numShares}</div>
            </div>
            <div className="reaction more-container vertical-container u-pull-left" onClick={this.toggleComments}>
              <ShowMore
                size={22}
                className="like-icon vertical-container-child"/>
              <div className="more">Comments</div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
        <div className={"comments-wrapper " + (this.state.showComments ? "show" : "hide")}>
          {commentList}
          <div className="post-comment">
            <textarea class="u-full-width" placeholder="Comment…" id="postComment"></textarea>
            <button className="button light-button u-pull-right">Submit</button>
          </div>
        </div>
      </div>

    )
	}
}

export default NewsArticleCell