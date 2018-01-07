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
      <Route path="/seller-visitor/:id/map" component={EcSellerVisitorMap}/>
      <Route path="/seller-visitor/register" exact component={EcRegister}/>
      <Route path="/seller-visitor/users-list" exact render={routeProps => <EcUsersList {...routeProps} onGoToProductDetail={() => {
            this.props.history.push('/seller-visitor/product-view')
          }} onGoToUsersList={() =>
          {this.props.history.push('/seller-visitor/users-list')}} onGoToMap={
            () => {
              this.props.history.push('/seller-visitor/map')
            }
          }/>}/>
      <Route path="/seller-visitor/product-view" exact component={EcProductDetail}/>
    </div>)
  }
}

SellerVisitor.propTypes = {}
