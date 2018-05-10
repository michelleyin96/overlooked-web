import React, { Component } from 'react';
import Request from 'superagent';
import UserIcon from 'react-icons/lib/fa/user';
import NavigationBar from '../components/NavigationBar';
import Profile from '../components/Profile';
import '../css/All.css';
import '../css/index.css';

class MyProfilePage extends Component {
	constructor(props) {
		super(props)
    this.state = {
      dataRetrieved: false,
      articleActivities: [],
      commentActivities: [],
    }
	}

  componentWillMount() {
    const sessionID = localStorage.getItem("sessionID");
    if (!sessionID) {
      alert("You are not logged in.")
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
                          profilePic: response.body.body.profilePic,
                          numFollowers: response.body.body.numFollowingUser,
                          numFollowing:response.body.body.numFollowedByUser,
                          followers: response.body.body.listFollowingUser,
                          following: response.body.body.listFollowedByUser,
                          articleActivities: response.body.body.articleActivities,
                          commentActivities: response.body.body.commentActivities
                        });
        });
    }
  }

  render() {
    const myProfile = true;
    return (
      <div className="profile-page">
        <NavigationBar />
        <Profile
          myProfile={ myProfile }
          displayName={ this.state.displayName}
          bio={ this.state.bio }
          profilePic= { this.state.profilePic }
          numFollowers={ this.state.numFollowers }
          numFollowing={ this.state.numFollowing }
          followers={ this.state.followers }
          following={ this.state.following}
          articleActivities={ this.state.articleActivities }
          commentActivities={ this.state.commentActivities }/>
      </div>
    );
  }
}

export default MyProfilePage