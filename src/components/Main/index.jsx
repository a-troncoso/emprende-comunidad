import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import EcSplash from '../Splash'
import EcUserFinder from '../UserFinder'
import EcUsersList from '../UsersList'
import EcProductView from '../ProductView'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main>
        <Route path="/" exact component={EcSplash}/>
        <Route path="/user-finder-map" component={EcUserFinder}/>
        <Route path="/users-list" component={EcUsersList}/>
        <Route path="/product-view/:productId" component={EcProductView}/>
      </main>
    )
  }
}
