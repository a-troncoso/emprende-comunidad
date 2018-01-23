import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Image} from 'semantic-ui-react'

import style from './ProductMarkers.scss'

export default class ProductMarkers extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className={style.root}>
        {this.props.user.products.map((product, key) => {
          return (
            <div className={style.product} key={key}>
              <Image onClick={() => this.props.onGoToProductDetail(product.uid)} src={product.pictureUrl} shape="circular"></Image>
            </div>
          )
        })}
      </div>
    )
  }
}

ProductMarkers.propTypes = {
  products: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onGoToProductDetail: PropTypes.func.isRequired
}
