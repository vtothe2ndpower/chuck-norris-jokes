import React, { Component } from 'react';

class Joke extends Component {
  render() {
    const { upvote, downvote } = this.props;
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={upvote}></i>
          <span>{this.props.votes}</span>
          <i className="fas fa-arrow-down" onClick={downvote}></i>
        </div>
        <div className="Joke-text">
          {this.props.text}
        </div>
      </div>
    )
  }
}

export default Joke;