import React from 'react'

import Square from './Square'

export default class Board extends React.Component {
  renderSquare(i) {
    return <Square winstatus={this.props.winlist.includes(i) ? "win" : "idle"} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
  }

  

  render() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let rowCont = []
    const contents = numbers.reduce((acc, p, i) => {
      rowCont.push(
        <>{this.renderSquare(i)}</>
      )
      if (i % 3 === 2) {
        acc.push(<div className="board-row">{rowCont}</div>)
        rowCont = []
      }
      return acc
    }, [])
    
    return (
      <div>
        {contents}
      </div>
    )
  }
}
