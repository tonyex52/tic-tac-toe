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
          <div>Player 1 <input type="text" className="input-text" placeholder="請輸入玩家1名字" onChange={(e) => this.props.assignName({which: 1, name: e.target.value})}/></div>
          <br/>
          <div>Player 2 <input type="text" className="input-text" placeholder="請輸入玩家2名字" onChange={(e) => this.props.assignName({which: 2, name: e.target.value})}/></div>
        </section>
      );
  }
}

class game extends Component {
  constructor(props) {
      super(props);
      this.state = {
        character: {
          player1: '',
          player2: ''
        }
      }
  }

  _assignName({which, name}) {
    let nameObject = {}
    nameObject['character'] = JSON.parse(JSON.stringify(this.state.character))
    nameObject['character'][`player${which}`] = name
    this.setState(nameObject)
  }

  render() {
    return (
      <Naming assignName={this._assignName.bind(this)}/>
    );
  }
}

export default game;
