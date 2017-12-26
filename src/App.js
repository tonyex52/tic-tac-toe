import React, { Component } from 'react';
import './App.css';

const Naming = (props) => {
  let character = props.character
  return (
    <section className="player-naming">
      <div>Player 1 <input type="text" className="input-text" placeholder="請輸入玩家1名字" value={character.player1} onChange={(e) => props.assignName({which: 1, name: e.target.value})}/></div>
      <br/>
      <div>Player 2 <input type="text" className="input-text" placeholder="請輸入玩家2名字" value={character.player2} onChange={(e) => props.assignName({which: 2, name: e.target.value})}/></div>
    </section>
  );
}

const SelectFirst = (props) => {
  let character = props.character
  let isStart = props.isStart
  return (
    <div>
      <button className="choose-first-button" disabled={isStart ? 'disabled' : ''} onClick={() => {props.assignNext(-1)}}>選擇"{character.player1}"作為開始</button>
      <button className="choose-first-button" disabled={isStart ? 'disabled' : ''} onClick={() => {props.assignNext(1)}}>選擇"{character.player2}"作為開始</button>
      <button className="choose-first-button" disabled={isStart ? 'disabled' : ''}  onClick={() => {
        let list = [-1, 1]
        props.assignNext(list[Math.floor(Math.random() * 100) % 2])}
      }>隨機</button>
      <button className="reset-button" onClick={() => props.reset()}>重置</button>
    </div>
  );
}

const Board = (props) => {
  let character = props.character
  return (
    <div className="board-container">
      {props.display.map((value, index) =>
        <div className="board-item" onClick={() => {props.selectBoardItem(index)}}>
          {value === 0 ? '' : value < 0 ? character.player1 : character.player2}
        </div>)}
    </div>
  );
}

class Game extends Component {
  constructor(props) {
      super(props);
      this.state = {
        character: {
          player1: 'player1',
          player2: 'player2'
        },
        board: [0,0,0,0,0,0,0,0,0],
        next: -1,
        isStart: false,
        winner: null
      }
      this.winRulesArray = [
        [0,1,2],[3,4,5],
        [6,7,8],[0,3,6],
        [1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ]
  }

  _assignName({which, name}) {
    let nameObject = {}
    nameObject['character'] = JSON.parse(JSON.stringify(this.state.character))
    nameObject['character'][`player${which}`] = name

    this.setState(nameObject)
  }

  _selectBoardItem (index) {
    let board = this.state.board
    if(board[index] !== 0 || this.state.winner !== null) return

    let newboard = board.concat()
    let next = this.state.next
    newboard[index] = next
    this.setState({board: newboard, isStart: true}, () => {
      if( this._checkWinner() ) {
        this.setState({winner: this.state.next})
      } else {
        this._assignNext(-next)
      }
    })
  }

  _checkWinner () {
    let board = this.state.board

    return this.winRulesArray.filter((ruleArray) => {
      return Math.abs(ruleArray.reduce((i, boardIndex) => {
        return i + board[boardIndex]
      }, 0)) === 3
    }).length
  }

  _assignNext(next) {
    this.setState({next})
  }

  _computedPlayerName() {
    let state = this.state
    return state.next === -1 ? state.character.player1 : state.character.player2
  }

  _reset() {
    let board = this.state.board.map(() => 0)
    this.setState({
      board,
      next: -1,
      isStart: false,
      winner: null
    })
  }

  render() {
    let character = this.state.character
    return (
      <div className="game-container">
        <div className="flexbox">
          <Naming assignName={this._assignName.bind(this)} character={character}/>
          <div className="state">{this.state.winner !== null ? '你贏了' : '換你囉~'} {this._computedPlayerName()}</div>
        </div>
        <SelectFirst assignNext={this._assignNext.bind(this)} character={character} isStart={this.state.isStart} reset={this._reset.bind(this)}/>


        <Board display={this.state.board} character={character} selectBoardItem={this._selectBoardItem.bind(this)}/>
      </div>
    );
  }
}

export default Game;
