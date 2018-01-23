import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {Image} from 'semantic-ui-react'
import EcProductMarkers from '../ProductMarkers'
import defaultAvatarPic from '@/assets/images/default-avatar.png'

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
    const srcUserImage = this.props.user.image || defaultAvatarPic
    // Si es de tipo "own" (indica si el marcador es de tipo user-seller) se muestra con color celeste
    const markerClasses = this.props.type === 'own' ? [style.markerPin, style.markerPinOwn, style.markerBounce] : [style.markerPin, style.markerBounce]

    return (
      <div ref={node => {
        this.node = node
      }}>
        <div className={style.markerPulse}></div>
        {
          this.state.showProductMarkers && this.props.user.products.length > 0 && (
            <EcProductMarkers
              onGoToProductDetail={productUid => this.props.onGoToProductDetail(productUid)}
              products={this.props.user.products}
              user={this.props.user}></EcProductMarkers>
          )
        }
        <div className={markerClasses.join(' ')} onClick={this.onClickMarker}>
          <img src={srcUserImage} className={style.markerImage}></img>
        </div>
      </div>
    )
  }
}

Marker.propTypes = {
  user: PropTypes.object,
  onGoToProductDetail: PropTypes.func.isRequired,
  type: PropTypes.string
}
