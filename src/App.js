import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Naming extends Component {

  constructor(props) {
      super(props);
  }

  render() {
      return (
        <section className="player-naming">
          <div>Player 1 <input type="text" onChange={(e) => this.props.assignName({which: 1, name: e.target.value})}/></div>
          <br/>
          <div>Player 2 <input type="text"/></div>
        </section>
      );
  }
}

class game extends Component {
  constructor(props) {
      super(props);
      this.state = {
        player1: '',
        player2: ''
      }
  }

  _assignName({which, name}) {
    let nameObject = {}
    nameObject[`player${which}`] = name
    this.setState(nameObject)
  }

  render() {
    return (
      <Naming assignName={this._assignName}/>
    );
  }
}

export default game;
