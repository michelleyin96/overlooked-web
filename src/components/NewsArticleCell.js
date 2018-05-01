import React, { Component } from 'react';
import Request from 'superagent';
import moment from 'moment';
import Comment from './Comment';
import Like from './HeartIcon';
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
      numLikes: this.props.likes.length,
      numShares: this.props.shares.length,
      viewerHasLiked: this.props.viewerHasLiked,
      articleID: this.props.articleID,
      sessionID: this.props.sessionID,
      viewerName: this.props.viewerName,
      viewerHasShared: this.props.viewerHasShared,
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

  componentWillMount() {
    if (!this.state.sessionID) {
      const ID = localStorage.getItem("sessionID");
      this.setState({ sessionID: ID})
    }
  }

  /**
   * Send POST request to like an article.
   */
  likeArticle(event) {
    var sessionID = this.state.sessionID;
    var articleID = this.state.articleID;

    if(this.state.viewerHasLiked) {
      console.log("unlike")
      Request.del('https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/articles/likes?')
        .send({"params" :
                { "sessionID" : sessionID,
                  "articleID" : articleID,
                }
              })
        .then(response => {
          console.log(response.body)
          if (response.body.status == "Success") {
            var likes = this.state.numLikes - 1;
            const likeOption = this.state.viewerHasLiked;
            this.setState({ numLikes: likes,    
                            viewerHasLiked: !likeOption
                          })
          } else if (response.body.status == "Failure") {
            alert("Failed to like article.");
          }
        });
    } else {
      console.log("like")
      Request.post('https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/articles/likes?')
        .send({"params" :
                { "sessionID" : sessionID, "articleID" : articleID }
              })
        .then(response => {
          console.log(response.body)
          if (response.body.status == "Success") {
            var likes = this.state.numLikes + 1;
            const likeOption = this.state.viewerHasLiked;
            this.setState({ numLikes: likes })
            this.setState({ viewerHasLiked: !likeOption})
          } else if (response.body.status == "Failure") {
            alert("Failed to like article.");
          }
        });
    }
  }

  /**
   * POST request when user attempts to comment on an article.
   */
  postComment(event) {
    var sessionID = this.state.sessionID;
    var articleID = this.state.articleID;
    var commentText = this.state.commentText;
    var commentURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/articles/comments?";

    Request.post(commentURL)
      .send({"params" :
              { "sessionID" : sessionID,
                "articleID" : articleID,
                "content" : commentText }
            })
      .then(response => {
        console.log(response.body)
        if (response.body.status == "Success") {
          var newComments = this.state.commentPosts;
          newComments.push(this.state.commentText);
          this.setState({ commentPosts: newComments });
          this.setState({ commentText: "" });
        } else if (response.body.status == "Failure") {
          alert("Failed to post comment.");
        }
      });
  }

  /**
   * POST request when user wants to share an article.
   */
  shareArticle(event) {
    var sessionID = this.state.sessionID;
    var articleID = this.state.articleID;
    var shareURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/articles/shares?";

    if(this.state.viewerHasShared) {
      console.log("unshare")
      Request.del(shareURL)
        .send({"params" :
                { "sessionID" : sessionID,
                  "articleID" : articleID,
                }
              })
        .then(response => {
          console.log(response.body)
          if (response.body.status == "Success") {
            var shares = this.state.numShares - 1;
            const shareOption = this.state.viewerHasShared;
            this.setState({ numShares: shares,    
                            viewerHasShared: !shareOption
                          })
          } else if (response.body.status == "Failure") {
            alert("Failed to unshare article.");
          }
        });
    } else {
      console.log("share")
      Request.post(shareURL)
        .send({"params" :
                { "sessionID" : sessionID,
                  "articleID" : articleID
                }
              })
        .then(response => {
          console.log(response.body)
          if (response.body.status == "Success") {
            var shares = this.state.numShares + 1;
            const shareOption = this.state.viewerHasShared;
            this.setState({ numShares: shares })
            this.setState({ viewerHasShared: !shareOption})
          } else if (response.body.status == "Failure") {
            alert("Failed to share article.");
          }
        });
    }
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
    const numLikes = this.state.numLikes;
    const numShares = this.state.numShares;
    var comments = this.state.comments;
    var commentPosts = this.state.commentPosts;
    var yourName = this.state.viewerName;
    var viewerID = this.state.sessionID;
    var commentList = comments.map(function(comment){
                        return <Comment
                                  author={comment.fName + " " + comment.lName}
                                  authorID={comment.sessionID}
                                  body={comment.content}
                                  date={comment.dateAdded}
                                  viewerID={viewerID}
                                />;
                      });
    var commentPostList = commentPosts.map(function(commentText){
                            return <Comment author={ yourName } body={commentText}/>;
                          });
    const nested = this.props.nested;
    var postClass;
    if (nested == "true") {
      postClass = "nested-post";
    } else {
      postClass = "post"
    }

    return (
      <div className={postClass}>
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
              <Like liked={ this.state.viewerHasLiked } />
              <div className="num-likes vertical-container-child">{numLikes}</div>
            </div>
            <div className="reaction share-container vertical-container u-pull-left" onClick={this.shareArticle}>
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