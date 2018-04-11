import React, { Component } from 'react';
import Request from 'superagent';
import George from '../img/george.jpg';

class Profile extends Component {
	constructor(props) {
		super(props)
    this.state = {
      postText: '',
    }
    this.postTextChange = this.postTextChange.bind(this);
	}

  /**
   * Tracks text changes
   */
  postTextChange(event) {
    this.setState({ postTextChange: event.target.value });
  }


  render() {
    return (
      <div className="profile-container">
        <div className="row">
          <div className="three columns">
            <div className="profile-photo">
              <img src={George} className="img"/>
            </div>
            <div className="about border">
              <div className="title-box">George Sehremelis</div>
              <div className="info">
                <div className="follower-info followers">
                  <div className="text">Followers</div>
                  <div className="number">2000</div>
                </div>
                <div className="follower-info">
                  <div className="text">Following</div>
                  <div className="number">200</div>
                </div>
              </div>
            </div>
            <div className="about border">
              <div className="title-box">About</div>
              <div className="info">Some text asdfasdfsd asdlkfjas;dfk alsjdfalksdf alskdfj</div>
            </div>
            <div className="button edit-profile">Edit Profile</div>
          </div>
          <div className="nine columns">
            <div className="write-post">
              <textarea
                className="u-full-width"
                ref={ this.postInput }
                placeholder="Share a post…"
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
      </div>
    );
  }
}

export default Profile