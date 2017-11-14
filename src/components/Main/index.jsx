import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import EcSplash from '../Splash'
import EcUserFinder from '../UserFinder'
import EcUsersList from '../UsersList'
import EcProductView from '../ProductView'
import EcSeller from '../Seller'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main>
        <Route path="/" exact component={EcSplash}/>
        <Route path="/user-finder-map" exact component={EcUserFinder}/>
        <Route path="/users-list" exact component={EcUsersList}/>
        <Route path="/product-view/:productId" exact component={EcProductView}/>
        <Route path="/seller" exact component={EcSeller}/>
      </main>
    )
  }
}
