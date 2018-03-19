import React, { Component } from 'react';

class NewsTopic extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var classes = "topic";
    if (this.props.topic == this.props.activeTopic) {
      classes = "topic underline"
    }
    return (
      <div className="two columns" onClick={(e) => this.props.handleClick(this.props.topic)}>
        <h5 className={classes} id={this.props.topic}>{this.props.topic}</h5>
      </div>
    )
	}
}

export default NewsTopic