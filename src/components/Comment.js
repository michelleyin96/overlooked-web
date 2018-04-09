import React, { Component } from 'react';

class Comment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="comment">
        <h6 className="comment-author">{ this.props.author }</h6>
        <p className="comment-body">{ this.props.body }</p>
      </div>
    )
	}
}

export default Comment