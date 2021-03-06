import React, { Component } from 'react';
import Request from 'superagent';
import moment from 'moment'
import Comment from './Comment';
import Like from './HeartIcon';
import Share from 'react-icons/lib/fa/retweet';
import ShowMore from 'react-icons/lib/fa/angle-down';

class PostActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      commentText: '',
      comments: [],
      commentPosts: [],
      numLikes: 22,
      liked: false,
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
    // var articleID = this.props.articleID;
    // if(this.state.liked) {
    //   console.log("unlike")
    //   Request.del('https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/articles/likes?')
    //     .send({"params" :
    //             { "sessionID" : "1234",
    //               "articleID" : "1",
    //             }
    //           })
    //     .then(response => {
    //       console.log(response.body)
    //       if (response.body.status == "Success") {
    //         var likes = this.state.numLikes - 1;
    //         const likeOption = this.state.liked;
    //         this.setState({ numLikes: likes })
    //         this.setState({ liked: !likeOption})
    //       } else if (response.body.status == "Failure") {
    //         alert("Failed to like article.");
    //       }
    //     });
    // } else {
    //   console.log("like")
    //   Request.post('https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/articles/likes?')
    //     .send({"params" :
    //             { "sessionID" : "1234", "articleID" : "1" }
    //           })
    //     .then(response => {
    //       console.log(response.body)
    //       if (response.body.status == "Success") {
    //         var likes = this.state.numLikes + 1;
    //         const likeOption = this.state.liked;
    //         this.setState({ numLikes: likes })
    //         this.setState({ liked: !likeOption})
    //       } else if (response.body.status == "Failure") {
    //         alert("Failed to like article.");
    //       }
    //     });
    // }
  }

  /**
   * POST request when user attempts to comment on an article.
   */
  postComment(event) {
    // var newComments = this.state.commentPosts;
    // newComments.push(this.state.commentText);
    // this.setState({ commentPosts: newComments });
    // this.setState({ commentText: "" });
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
    // var commentList = comments.map(function(comment){
    //                     return <Comment
    //                               author={comment.fName + " " + comment.lName}
    //                               body={comment.content}
    //                             />;
    //                   });
    // var commentPostList = commentPosts.map(function(commentText){
    //                         return <Comment author={"Your Name"} body={commentText}/>;
    //                       });

    var commentList = [];
    var commentPostList = [];

    return (
      <div className="article-comment">
        <div className="title">
          <span className="name space">George Sehremelis</span>
        </div>
        <div className="date">Dec 09, 2018</div>
        <div className="comment-text">
        This is a post and I just really want to share my thoughts on overlooked.
        </div>
        <div className="reaction-container">
          <div className="reaction like-container vertical-container u-pull-left" onClick={this.likeArticle}>
            <Like liked={ this.state.liked } />
            <div className="num-likes vertical-container-child">{22}</div>
          </div>
          <div className="reaction share-container vertical-container u-pull-left">
            <Share size={20} className="like-icon u-pull-left vertical-container-child"/>
            <div className="num-likes vertical-container-child">{25}</div>
          </div>
          <div className="reaction more-container vertical-container u-pull-left" onClick={this.toggleComments}>
            <ShowMore
              size={22}
              className="like-icon vertical-container-child"/>
            <div className="more">Comments</div>
          </div>
          <div className="clear"></div>
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

export default PostActivity