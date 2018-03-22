import React, { Component } from 'react';
import moment from 'moment'

class ArticleCell extends Component {
	render() {
    const date = moment(this.props.date).format('MMM DD, YYYY')
    const context = this.props.author + " · " + date
    return (
      <div>
      <div className="article-wrapper">
    		<a href={this.props.url} className="article-container">
          <img src={this.props.img} className="article-imgurl block" />
          <div className="article block">
            <h6>{this.props.title}</h6>
            <span>{context}</span>
            <p className="description">{this.props.description}</p>
          </div>
        </a>
      </div>
      <div class="row">
        <div class="three columns">Like</div>
        <div class="three columns">Columns</div>
        <div class="three columns">Share</div>
      </div>
      </div>
    )
	}
}

export default ArticleCell