import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Image} from 'semantic-ui-react'
import {createHashHistory} from 'history'
import {Link} from 'react-router-dom'
export const history = createHashHistory()

import style from './ProductMarkers.scss'

export default class ProductMarkers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={style.root}>
        {this.props.user.products.map((product, key) => {
          return (
            <div className={style.product} key={key}>
              <Link to={{
                pathname: `product-view`,
                state: {
                  user: this.props.user,
                  product
                }
              }}>
                <Image src={product.image} shape="circular"></Image>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

ProductMarkers.propTypes = {
  products: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}
