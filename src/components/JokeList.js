import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

// https://api.chucknorris.io/jokes/random


class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);

    this.state = {
      jokes: []
    };
  }

  async componentDidMount() {
    // Load Jokes
    let jokes = [];
    while(jokes.length < this.props.numJokesToGet) {
      let res = await axios.get('https://api.chucknorris.io/jokes/random');
      jokes.push({ id: uuid(), text: res.data.value, votes: 0 });
    }
    this.setState({ jokes });
  }

  handleVote(id, delta) {
    this.setState(curState => ({
      jokes: curState.jokes.map(j => 
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
    }));
  }

  render() {
    return (
      <div className="JokeList">
        <h1>Chuck Norris Jokes</h1>
        <div className="JokeList-jokes">
          {this.state.jokes.map(joke => (
            <Joke 
              key={joke.id} 
              votes={joke.votes} 
              text={joke.text} 
              upvote={() => this.handleVote(joke.id, 1)} 
              downvote={() => this.handleVote(joke.id, -1)} 
            />
          ))}
        </div>
      </div>
    )
  }
}

export default JokeList;