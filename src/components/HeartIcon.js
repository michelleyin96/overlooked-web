import React, { Component } from 'react';
import Like from 'react-icons/lib/fa/heart-o';
import Liked from 'react-icons/lib/fa/heart';

class HeartIcon extends Component {
  constructor(props) {
    super(props);
  }

	render() {
    console.log(this.props.liked)
    if (!this.props.liked) {
      return <Like size={18} className="like-icon vertical-container-child"/>
    }
    return (
      <Liked size={18} className="liked-icon vertical-container-child"/>
    )
	}
}

export default HeartIcon