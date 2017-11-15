import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import classNames from 'classnames'
import {Image} from 'semantic-ui-react'

import EcProductMarkers from '../ProductMarkers'

import style from './Marker.scss'

export default class Marker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showProductMarkers: false
    }

    this.onClickMarker = this.onClickMarker.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  componentWillMount() {
    this.ismounted = true
  }

  componentWillUnmount() {
    this.ismounted = false
  }

  onClickMarker() {
    if (!this.state.showProductMarkers) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false)
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false)
    }

    this.setState(prevState => ({
      showProductMarkers: !prevState.showProductMarkers
    }))
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node && this.node.contains(e.target)) {
      return
    }

    if (this.ismounted) {
      this.onClickMarker()
    }
  }

  render() {
    return (
      <div ref={node => {
        this.node = node
      }}>
        <div className={style.markerPulse}></div>
        {this.state.showProductMarkers && this.props.user.products.length > 0 && (
          <EcProductMarkers products={this.props.user.products}></EcProductMarkers>
        )}
        <div className={[style.markerPin, style.markerBounce].join(' ')} onClick={this.onClickMarker}>
          <img src={this.props.user.image} className={style.markerImage}></img>
        </div>
      </div>
    )
  }
}

Marker.propTypes = {
  user: PropTypes.object
}
