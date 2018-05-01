import React, { Component } from 'react';
import Request from 'superagent';

import NavigationBar from '../components/NavigationBar';
import PostActivity from '../components/PostActivity';
import ShareActivity from '../components/ShareActivity';
import CommentActivity from '../components/CommentActivity';
import '../css/All.css';
import '../css/index.css';

class LooksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      looks: [],
    }
    this.fetchLooks = this.fetchLooks.bind(this);
  }

  componentWillMount() {
    this.fetchLooks();
  }

  fetchLooks() {
    const sessionID = localStorage.getItem("sessionID");
      if (!sessionID) {
        alert("Cannot access this page")
        this.props.history.push("/");
      }
    const looksURL = "https://klo9j9w9n8.execute-api.us-west-1.amazonaws.com/test/client/articles/looks?sessionID="
                      + sessionID;

    Request
      .get(looksURL)
      .then(response => {
        if (response.body.status == "Success") {
          this.setState({ looks: response.body.body })
        }
      });
  }

  render() {
    var looks = [];
    looks = this.state.looks ? this.state.looks : [];
    var looksComponent = looks.map(function(look, i) {
                          if (look.activityType == "Comment") {
                            return <CommentActivity
                                      key={i}
                                      displayName={look.fName + " " + look.lName}
                                      commentAuthorID={look.sessionID}
                                      articleInfo={look.articleInfo}
                                      date={look.dateAdded}
                                    />;
                          } else {
                            return <ShareActivity
                                      key={i}
                                      displayName={look.fName + " " + look.lName}
                                      commentAuthorID={look.sessionID}
                                      articleInfo={look.articleInfo}
                                      date={look.dateAdded}
                                      activityType={look.activityType}
                                    />;
                          }
                      });

    return (
    	<div className="looks-page">
    		<NavigationBar />
        <div className="looks-feed">
          { looksComponent }
        </div>
      </div>
    );
  }
}

export default LooksPage;