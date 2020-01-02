import React from 'react'

import Board from './Board'

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          lastClick: []
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      toggled: false
    }
  }

  calcWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]]
      }
    }
    return null
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (this.calcWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastClick: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }

  toggleClick(e) {
    if (!this.state.toggled) {
      this.setState({
        toggled: true
      })
    } else {
      this.setState({
        toggled: false
      })
    }
  }

  render() {
    let history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = this.calcWinner(current.squares)
    let reversedAttribute=null

    if (this.state.toggled) {
      history = history.slice(0).reverse()
      reversedAttribute='reversed'
    }
    else {
      reversedAttribute=null
    }

    const moves = history.map((step, move) => {
      let desc
      const coordTable = ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2', '2,0', '2,1', '2,2']

      if (this.state.toggled) {
        if (move===history.length-1) {
          desc = 'Go to game start'
        } else {
          desc = 'Go to move #' + move + ' (' + coordTable[history[move].lastClick] + ')'
        }
      } else {
        desc = move ? 'Go to move #' + move + ' (' + coordTable[history[move].lastClick] + ')' : 'Go to game start'
      }

      if (((!this.state.toggled) && (move === this.state.stepNumber))||((this.state.toggled) && (!move))) {
        return (
          <li key={move}>
            <button key={move} onClick={() => this.jumpTo(move)}>
              <b>{desc}</b>
            </button>
          </li>
        )
      } else {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      }
    })

    let status, winlist
    if (winner && history.length<10) {
      status = 'Winner: ' + winner[0]
      winlist=[winner[1][0],winner[1][1],winner[1][2]]
    } else if (history.length===10) {
      status = 'Draw!'
      winlist=[]
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
      winlist=[]
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} winlist={winlist} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol reversed={reversedAttribute}>{moves}</ol>
          <div>
            <button onClick={e => this.toggleClick(e)}>Toggle Move List</button>
          </div>
        </div>
      </div>
    )
  }
}
