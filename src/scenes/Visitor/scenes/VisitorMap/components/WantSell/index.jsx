import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from './WantSell.scss'

export default class WantSeller extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<button className={style.root}  onClick={() => {this.props.onWantBeSeller()}}>¡Quiero vender algo!</button>);
  }
}

WantSeller.propTypes = {
  onWantBeSeller: PropTypes.func
};
