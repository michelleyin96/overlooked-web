import React, { Component } from 'react';
import NewsTopic from './NewsTopic'

class NewsTopicBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTopic: "popular"
    }
  }

  _updateActiveTopic(topic) {
    console.log(topic)
    this.setState({activeTopic: topic})
  }

	render() {
    return (
      <div className="container news-topic-bar">
    		<div className="row">
          <NewsTopic topic="popular" activeTopic={this.state.activeTopic} handleClick={this._updateActiveTopic.bind(this)}/>
          <NewsTopic topic="looks" activeTopic={this.state.activeTopic} handleClick={this._updateActiveTopic.bind(this)}/>
          <NewsTopic topic="corruption" activeTopic={this.state.activeTopic} handleClick={this._updateActiveTopic.bind(this)}/>
          <NewsTopic topic="legislation" activeTopic={this.state.activeTopic} handleClick={this._updateActiveTopic.bind(this)}/>
          <NewsTopic topic="innovation" activeTopic={this.state.activeTopic} handleClick={this._updateActiveTopic.bind(this)}/>
          <NewsTopic topic="universities" activeTopic={this.state.activeTopic} handleClick={this._updateActiveTopic.bind(this)}/>
        </div>
      </div>
    )
	}
}

export default NewsTopicBar