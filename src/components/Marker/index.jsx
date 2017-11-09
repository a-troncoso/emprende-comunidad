import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import classNames from 'classnames'
import {Image} from 'semantic-ui-react'

import style from './Marker.scss'


export default class Marker extends Component {
  constructor(props) {
    super(props)

    this.onClickMarker = this.onClickMarker.bind(this)
  }

  componentWillMount() {}

  onClickMarker() {
    console.log('marker clicked')
  }

  render() {
    return (
      <div>
        <div className={[style.markerPin,style.markerBounce].join(' ')} onClick={this.onClickMarker}>
          <img src={this.props.user.image} className={style.markerImage}></img>
        </div>
        <div className={style.markerPulse}></div>
      </div>
    )
  }
}

Marker.propTypes = {
  text: PropTypes.string,
  // user: PropTypes.object
}
