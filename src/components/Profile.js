import React, { Component } from 'react';
import Request from 'superagent';
import {
  browserHistory,
  withRouter,
  Link
} from "react-router-dom";
import PostActivity from './PostActivity';
import ShareActivity from './ShareActivity';
import CommentActivity from './CommentActivity';
import User from './User';
import George from '../img/george.jpg';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import UserIcon from 'react-icons/lib/fa/user';

class Profile extends Component {

	constructor(props) {
		super(props);
    this.state = {
      postText: '',
      articleActivities: [],
      commentActivities: [],
      viewerIsFollowing: false,
      showFollowers: false,
      showFollowing: false
    }
    this.postTextChange = this.postTextChange.bind(this);
    this.getFollowerButton = this.getFollowerButton.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.openFollowers = this.openFollowers.bind(this);
    this.closeFollowers = this.closeFollowers.bind(this);
    this.openFollowing = this.openFollowing.bind(this);
    this.closeFollowing = this.closeFollowing.bind(this);
	}

  componentWillMount() {
    console.log("mount");
    console.log(this.props);
  }

  /**
   * Tracks text changes
   */
  postTextChange(event) {
    this.setState({ postTextChange: event.target.value });
  }

  /**
   * Redirect to Edit profile page
   */
  editProfile(event) {
    console.log(this.props)
    this.props.history.push("/settings");
  }

  /**
   * Execute follow user action
   */
  followUser(event) {
    const followedBySessionID = localStorage.getItem("sessionID");
    if (!followedBySessionID) {
      alert("You must log in to view page.");
      this.props.history.push("/");
    }

    const toFollowSessionID = this.props.sessionID;

     const connectionURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/connections?"
     Request.post(connectionURL)
       .send({"params" :
               { "toFollowSessionID" : toFollowSessionID, "followedBySessionID" : followedBySessionID }
             })
       .then(response => {
         console.log(response.body)
         if (response.body.status == "Success") {
           this.setState({ viewerIsFollowing: true })
         } else if (response.body.status == "Failure") {
           alert("Failed to follow user.");
         }
       });
  }

  /**
   * Execute unfollow user action
   */
  unfollowUser(event) {
   const unfollowedBySessionID = localStorage.getItem("sessionID");
   if (!unfollowedBySessionID) {
     alert("You must log in to view page.");
     this.props.history.push("/");
   }

   const toUnfollowSessionID = this.props.sessionID;

    const connectionURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/connections?"
    Request.del(connectionURL)
      .send({"params" :
              { "unfollowedBySessionID" : unfollowedBySessionID, "toUnfollowSessionID" : toUnfollowSessionID }
            })
      .then(response => {
        console.log(response.body)
        if (response.body.status == "Success") {
          this.setState({ viewerIsFollowing: false })
        } else if (response.body.status == "Failure") {
          alert("Failed to follow user.");
        }
      });
  }

  /**
   * Open followers modal
   */
  openFollowers(event) {
    this.setState({ showFollowers: true })
  }

  /**
   * Close followers modal
   */
  closeFollowers() {
    this.setState({ showFollowers: false })
  }


  /**
   * Open followers modal
   */
  openFollowing(event) {
    this.setState({ showFollowing: true })
  }

  /**
   * Close followers modal
   */
  closeFollowing() {
    this.setState({ showFollowing: false })
  }

  /**
   * Determine which button to show
   */
  getFollowerButton() {
    if (this.props.myProfile) {
      return <div className="button edit-profile" onClick={this.editProfile}>Edit Profile</div>;
    } else {
      if (this.state.viewerIsFollowing) {
        return <div id="unfollow" className="button edit-profile" onClick={this.unfollowUser}>Unfollow</div>;
      } else {
        return <div id="follow" className="button edit-profile" onClick={this.followUser}>Follow</div>;
      }
    }
  }

  _closeFollowersModal(event) {
    this.setState({ showFollowers: false })
  }

  _closeFollowingModal(event) {
    this.setState({ showFollowing: false })
  }

  render() {
    const myProfile = this.props.myProfile;
    const displayName = this.props.displayName;

    var commentActivities = [];
    commentActivities = this.props.commentActivities ? this.props.commentActivities : [];
    var commentActivitiesList = commentActivities.map(function(activity) {
                                  return <CommentActivity
                                            displayName={displayName}
                                            commentID={activity.commentID}
                                            articleInfo={activity.articleInfo}
                                            content={activity.content}
                                            date={activity.dateAdded}
                                          />;
                                });

    var articleActivities = [];
    articleActivities = this.props.articleActivities ? this.props.articleActivities : [];
    var articlesActivitiesList = articleActivities.map(function(activity){
                                  return <ShareActivity
                                            displayName={displayName}
                                            articleInfo={activity.articleInfo}
                                            type={activity.activityType}
                                            date={activity.dateAdded}
                                          />;
                                  });

    if (this.props.bio && !this.state.followerStateInitialized) {
      this.setState({ followerStateInitialized: true,
                      viewerIsFollowing: this.props.viewerIsFollowing,
                      followers: this.props.followers,
                      following: this.props.following
                    })
    }

    var displayButton = this.getFollowerButton();

    var followersList = [];
    var followingList = [];
    if (this.state.followers) {
      var followers = this.state.followers;
      followersList = followers.map(follower => {
                        return <User
                                  fName={follower.fName}
                                  lName={follower.lName}
                                  sessionID={follower.sessionID}
                                  updateProfile={ this._closeFollowersModal.bind(this) }
                                />;
                      })
    }

    if (this.state.following) {
      var following = this.state.following;
      followingList = following.map(follower => {
                        return <User
                                  fName={follower.fName}
                                  lName={follower.lName}
                                  sessionID={follower.sessionID}
                                  updateProfile={ this._closeFollowingModal.bind(this) }
                                />;
                      })
    }

    if (this.props.profilePic && !this.state.profilePic) {
      var profilePicURL = this.props.profilePic;
      if (profilePicURL.length > 2) {
        this.setState({ profilePic: profilePicURL })
      }
    }

    const profilePic = this.state.profilePic ? (
                     <img src={this.state.profilePic} className="img"/>
                   ) : (
                     <div className="placeholder-photo">
                        <UserIcon size={150} className="user-icon"/>
                      </div>
                   );

    return (
      <div className="profile-container">
        <div className="row">
          <div className="three columns">
            <div className="profile-photo">
              { profilePic }
            </div>
            <div className="about border">
              <div className="title-box">{ this.props.displayName }</div>
              <div className="info">
                <div className="follower-info followers" onClick={this.openFollowers}>
                  <div className="text">Followers</div>
                  <div className="number">{ this.props.numFollowers }</div>
                </div>
                <div className="follower-info" onClick={this.openFollowing}>
                  <div className="text">Following</div>
                  <div className="number">{ this.props.numFollowing }</div>
                </div>
              </div>
            </div>
            <div className="about border">
              <div className="title-box">About</div>
              <div className="info">{ this.props.bio }</div>
            </div>
            { displayButton }
          </div>
          <div className="nine columns">
            <div className="profile-feed">
              { commentActivitiesList }
              { articlesActivitiesList }
            </div>
          </div>
        </div>
        <Modal open={this.state.showFollowers} onClose={this.closeFollowers} little>
          <h2 className="modal-header">Followers</h2>
          { followersList }
        </Modal>
        <Modal open={this.state.showFollowing} onClose={this.closeFollowing} little>
          <h2 className="modal-header">Following</h2>
          { followingList }
        </Modal>
      </div>
    );
  }
}

export default withRouter(Profile)