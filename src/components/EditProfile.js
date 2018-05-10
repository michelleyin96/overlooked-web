import React, { Component } from 'react';
import Request from 'superagent';
import George from '../img/george.jpg';
import UserIcon from 'react-icons/lib/fa/user';
import {
  Link,
  browserHistory,
  withRouter
} from "react-router-dom";
import firebase from '../firebase';

class EditProfile extends Component {
	constructor(props) {
		super(props);
    this.state = {
      profilePic: false,
    }
    this.fNameChange = this.fNameChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.bioChange = this.bioChange.bind(this);
    this.postChanges = this.postChanges.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.postPhoto = this.postPhoto.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
	}

  /**
   * Update first name field
   */
  fNameChange(event) {
    this.setState({ fName: event.target.value });
  }

  /**
   * Update last name field
   */
  lNameChange(event) {
    this.setState({ lName: event.target.value });
  }

  /**
   * Update biography field
   */
  bioChange(event) {
    if (!event.target.value) {
      this.setState({ bio: "" })
    } else {
      this.setState({ bio: event.target.value });
    }
  }

  /**
   * Post Changes 
   */
  postChanges(event) {
    const putURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/info?"
    const sessionID = localStorage.getItem("sessionID");
    if (!sessionID) {
      alert("You must re log in to view this page.");
      this.props.history.push("/");
    }
    const fName = this.state.fName;
    const lName = this.state.lName;
    const bio = this.state.bio;
    const email = this.state.email;

    Request
      .put(putURL)
      .send({"params" :
              {
                "sessionID": sessionID, 
                "email": email,
                "fName": fName,
                "lName": lName,
                "bio": bio,
                "profilePic": "",
              }
            })
      .then(response => {
        if (response.body.status == "Success") {
          alert("Successfully saved changes.")
          // this.props.history.push("/news");
        } else {
          alert("Failed to save changes. " + response.body.status);
          return;
        }
      })
  }

  /**
   * Upload profile photo
   */
  uploadPhoto(event) {
    var filelist = event.target.files;
    var numFiles = filelist.length;
    if (numFiles > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(filelist[numFiles - 1]);
    }
    reader.onload = (event) => {
      this.setState({ "profilePicURL": reader.result, "profilePic": true})
      this.postPhoto(reader.result)
    }
  }

  /**
   * Update Profile Picture
   */
  postPhoto(photo) {
    const putURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/info?"
    const sessionID = localStorage.getItem("sessionID");
    if (!sessionID) {
      alert("You must re log in to view this page.");
      this.props.history.push("/");
    }
    const fName = this.state.fName;
    const lName = this.state.lName;
    const bio = this.state.bio;
    const email = this.state.email;
    console.log(photo);
    Request
      .put(putURL)
      .send({"params" :
              {
                "sessionID": sessionID, 
                "email": email,
                "fName": fName,
                "lName": lName,
                "bio": bio,
                "profilePic": photo,
              }
            })
      .then(response => {
        if (response.body.status == "Success") {
          alert("Successfully saved changes.")
          // this.props.history.push("/news");
        } else {
          alert("Failed to save changes. " + response.body.status);
          return;
        }
      })
  }


  /** 
   * Delete Account
   */

  deleteAccount(event) {
    firebase.auth().onAuthStateChanged((user) => {
      var firebaseID = user.uid;
      user.delete().then(() => {
        alert("Successfully deleted.");
        this.props.history.push("/");
      }).catch(function(error) {
        alert(error.message);
        return;
      });
    });
  }


  componentWillMount() {
    const sessionID = localStorage.getItem("sessionID");
    if (!sessionID) {
      alert("You must re log in to view this page.");
      this.props.history.push("/");
    }

    const profileURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/users/info?sessionID="
                     + sessionID;
    Request
      .get(profileURL)
      .then(response => {
        if (response.body.status == "Success") {
          this.setState({ fName: response.body.body.fName,
                          lName: response.body.body.lName,
                          bio: response.body.body.bio,
                          email: response.body.body.email,
                          profilePicURL: response.body.body.profilePic,
                          retrieved: true
                        });
        } else {
          alert("Could not retrieve information. Please try again.")
        }
      });
  }


  render() {
    const profilePic = this.state.profilePicURL ? (
                     <img src={this.state.profilePicURL} className="img"/>
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
              {profilePic}
              <div className="button edit-profile" id="edit-photo" onClick={(e) => this.upload.click()}>
                Edit Profile Photo
              </div>
              <input
                type="file"
                id="file-upload"
                accept=".jpg, .jpeg, .png"
                ref={(ref) => this.upload = ref}
                onChange={(event) => { this.uploadPhoto(event) }}
                style={{ display: 'none' }}
              />
            </div>
            <div className="about border">
              <div className="title-box">{ "Display Name" }</div>
              { this.state && this.state.fName && this.state.lName &&
                <div className="info">
                  <input class="u-full-width"
                    type="text"
                    placeholder="First Name"
                    id="editFName"
                    value={this.state.fName}
                    onChange={this.fNameChange}
                  />
                  <input
                    class="u-full-width"
                    type="text"
                    placeholder="Last Name"
                    id="editLName"
                    value={this.state.lName}
                    onChange={this.lNameChange}
                  />
                  </div>
              }
            </div>
            <div className="about border">
              <div className="title-box">About</div>
              { this.state &&  
                <div className="info">
                  <textarea
                    className="u-full-width"
                    placeholder="Bio..."
                    id="editBio"
                    value={this.state.bio}
                    onChange={this.bioChange}>
                  </textarea>
                </div>
              }
            </div>
            <div id="save" className="button edit-profile" onClick={this.postChanges}>Save Changes</div>
          </div>
          <div className="nine columns">
            <div className="edit-account">
              <Link to="/resetpassword" className="action"><h5>Change account password</h5></Link>
              <div className="action" onClick={this.deleteAccount}><h5>Delete account</h5></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditProfile);