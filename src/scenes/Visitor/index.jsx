import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
import EcVisitorMap from './scenes/VisitorMap'
import EcUsersList from '@/scenes/UsersList'
import EcProductDetail from '@/scenes/ProductDetail'
import EcRegister from '@/scenes/Sign/Register'

export default class Visitor extends Component {
  constructor(props) {
    super(props)

    this.goto = this.goto.bind(this)
  }

  goto(route) {
    this.props.history.push('/visitor/register')
  }

  render() {
    return (<div>
      <Route path="/visitor/map" exact component={EcVisitorMap}/>
      <Route path="/visitor/register" exact component={EcRegister}/>
      <Route path="/visitor/users-list" exact component={EcUsersList}/>
      <Route path="/visitor/product-view" exact component={EcProductDetail}/>
    </div>);
  }
}

Visitor.propTypes = {
};
