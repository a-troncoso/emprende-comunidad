import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import style from './OwnMarker.scss'

export default class OwnMarker extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={style.marker}>
        <div className={style.markerDot}></div>
        <div className={style.markerPulse}></div>
      </div>
    )
  }
}

OwnMarker.propTypes = {}
