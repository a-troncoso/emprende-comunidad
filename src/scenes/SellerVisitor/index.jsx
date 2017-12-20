import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import EcSellerVisitorMap from './scenes/SellerVisitorMap'
import EcRegister from '@/scenes/Sign/Register'
import EcUsersList from '@/scenes/UsersList'
import EcProductDetail from '@/scenes/ProductDetail'

export default class SellerVisitor extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <Route path="/seller-visitor/map" exact component={EcSellerVisitorMap}/>
      <Route path="/seller-visitor/register" exact component={EcRegister}/>
      <Route path="/seller-visitor/users-list" exact component={EcUsersList}/>
      <Route path="/seller-visitor/product-view" exact component={EcProductDetail}/>
    </div>)
  }
}

SellerVisitor.propTypes = {}
