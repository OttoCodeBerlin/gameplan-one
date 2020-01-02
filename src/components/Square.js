import React from 'react'

export default function Square(props) {

  const statusToClassName= {
    idle: "square",
    win: "square-win"
  }
  return (
    <button className={statusToClassName[props.winstatus]} onClick={props.onClick}>
      {props.value}
    </button>
  )
}
