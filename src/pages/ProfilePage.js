import React, { Component } from 'react';
import Request from 'superagent';

import NavigationBar from '../components/NavigationBar';
import Profile from '../components/Profile';
import '../css/All.css';
import '../css/index.css';

class ProfilePage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        dataRetrieved: false,
        articleActivities: [],
        commentActivities: [],
        userID: this.props.location.state.viewerID
      }
      this.fetchProfileData = this.fetchProfileData.bind(this);
    }

    componentWillMount() {
      const sessionID = this.state.userID;
      if (!sessionID) {
        alert("Cannot access this page")
        this.props.history.push("/");
      }
      const profileURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/info?sessionID="
                            + sessionID;

      const retrieved = this.state.dataRetrieved;
      if (!retrieved) {
        Request
          .get(profileURL)
          .then(response => {
            this.setState({ displayName: response.body.body.fName + " " + response.body.body.lName,
                            bio: response.body.body.bio,
                            numFollowers: response.body.body.numFollowingUser,
                            numFollowing:response.body.body.numFollowedByUser,
                            followers: response.body.body.listFollowingUser,
                            following: response.body.body.listFollowedByUser,
                            articleActivities: response.body.body.articleActivities,
                            commentActivities: response.body.body.commentActivities,
                            dataRetrieved: true
                          });
          });
      }
    }

    fetchProfileData(profileID) {
      const profileURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/info?sessionID="
                            + profileID;
      Request
        .get(profileURL)
        .then(response => {
          this.setState({ displayName: response.body.body.fName + " " + response.body.body.lName,
                          bio: response.body.body.bio,
                          numFollowers: response.body.body.numFollowingUser,
                          numFollowing:response.body.body.numFollowedByUser,
                          followers: response.body.body.listFollowingUser,
                          following: response.body.body.listFollowedByUser,
                          articleActivities: response.body.body.articleActivities,
                          commentActivities: response.body.body.commentActivities,
                          dataRetrieved: true,
                        });
        });
    }

    componentWillReceiveProps(nextProps) {
      if (JSON.stringify(this.props) != JSON.stringify(nextProps)) {
        this.fetchProfileData(nextProps.location.state.viewerID);
      }
      this.setState({ userID: nextProps.location.state.viewerID, dataRetrieved: false });
    }

    render() {
      const myProfile = false;
      var viewerIsFollowing = false;

      const viewerID = localStorage.getItem("sessionID");
      if (!viewerID) {
        alert("You must log in to view page.");
        this.props.history.push("/");
      }
      var followers = [];
      followers = this.state.followers ? this.state.followers : [];
      followers.forEach((follower) => {
        if (follower.sessionID == viewerID) {
          viewerIsFollowing = true;
          return;
        }
      });

      return (
        <div className="profile-page">
          <NavigationBar />
          <Profile
            sessionID={ this.state.userID }
            myProfile={ myProfile }
            displayName={ this.state.displayName}
            bio={ this.state.bio }
            numFollowers={ this.state.numFollowers }
            numFollowing={ this.state.numFollowing }
            followers={ this.state.followers }
            following={ this.state.following}
            articleActivities={ this.state.articleActivities }
            commentActivities={ this.state.commentActivities }
            viewerIsFollowing={ viewerIsFollowing }
            followerStateInitialized = { this.state.dataRetrieved }
          />
        </div>
      );
    }
  }


export default ProfilePage