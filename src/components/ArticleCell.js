import React, { Component } from 'react';
import googleIcon from '../img/google-plus.png';
import moment from 'moment'

class ArticleCell extends Component {
	render() {
    const date = moment(this.props.date).format('MMM DD, YYYY')
    const context = this.props.author + " · " + date
    return (
      <div className="article-wrapper">
    		<a href={this.props.url} className="article-container">
          <img src={this.props.img} className="article-imgurl" />
          <div className="article">
            <h6>{this.props.title}</h6>
            <span>{context}</span>
            <p className="description">{this.props.description}</p>
          </div>
        </a>
      </div>
    )
	}
}

export default ArticleCell