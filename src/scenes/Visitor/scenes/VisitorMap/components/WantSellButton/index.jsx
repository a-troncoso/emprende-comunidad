import React, {Component} from 'react'
import style from './WantSell.scss'

const WantSellButton = (props) => {
  return (<button className={style.root} onClick={props.onClick}>¡Quiero vender algo!</button>)
}

export default WantSellButton
