import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import EcSplash from '../Splash'
import EcUserFinder from '../UserFinder'
import EcPlacesList from '../PlacesList'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main>
        <Route path="/" exact component={EcSplash}/>
        <Route path="/user-finder-map" component={EcUserFinder}/>
        <Route path="/places-list" component={EcPlacesList}/>
      </main>
    )
  }
}
