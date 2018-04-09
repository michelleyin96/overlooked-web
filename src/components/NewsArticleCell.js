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
      commentText: '',
      comments: this.props.comments,
      commentPosts: [],
    }

    // Bind action handlers
    this.toggleComments = this.toggleComments.bind(this);
    this.likeArticle = this.likeArticle.bind(this);
    this.shareArticle = this.shareArticle.bind(this);
    this.postComment = this.postComment.bind(this);
    this.commentTextAreaChange = this.commentTextAreaChange.bind(this);
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

  /**
   * POST request when user attempts to comment on an article.
   */
  postComment(event) {
    var newComments = this.state.commentPosts;
    newComments.push(this.state.commentText);
    this.setState({ commentPosts: newComments });
    this.setState({ commentText: "" });
  }

  /**
   * POST request when user wants to share an article.
   */
  shareArticle(event) {

  }

  /**
   * Update Comment Text Field
   */
  commentTextAreaChange(event) {
    this.setState({ commentText: event.target.value });
  }


	render() {
    const date = moment(this.props.date).format('MMM DD, YYYY');
    const context = this.props.author + " · " + date;
    const numLikes = this.props.likes.length;
    const numShares = this.props.shares.length;
    var comments = this.state.comments;
    var commentPosts = this.state.commentPosts;
    var commentList = comments.map(function(comment){
                        return <Comment
                                  author={"John Doe"}
                                  body={comment.content}
                                />;
                      });
    var commentPostList = commentPosts.map(function(commentText){
                            return <Comment author={"Your Name"} body={commentText}/>;
                          });

    return (
      <div className="post">
        <div className="article-wrapper">
      		<a href={this.props.url} className="article-container" target="_blank">
            <div className="row">
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
          {commentPostList}
          <div className="post-comment">
            <textarea
              className="u-full-width"
              ref={ this.commentInput }
              placeholder="Comment…"
              id="commentTextArea"
              value={ this.state.commentText }
              onChange={ this.commentTextAreaChange }>
            </textarea>
            <button className="button light-button u-pull-right" onClick={ this.postComment }>
              Submit
            </button>
          </div>
        </div>
      </div>

    )
	}
}

export default NewsArticleCell