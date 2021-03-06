import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import EcVisitorMap from './scenes/VisitorMap'
import EcRegisterStepper from '@/scenes/Sign/RegisterStepper'
import EcUsersList from '@/scenes/UsersList'
import EcProductDetail from '@/scenes/ProductDetail'

export default class Visitor extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <Route path="/visitor/map" exact component={EcVisitorMap}/>
      <Route path="/visitor/register-stepper" exact component={EcRegisterStepper}/>
      <Route path="/visitor/users-list" exact render={routeProps => <EcUsersList {...routeProps} onGoToProductDetail={() => {
            this.props.history.push('/visitor/product-view')
          }} onGoToUsersList={() =>
          {this.props.history.push('/visitor/users-list')}} onGoToMap={
            () => {
              this.props.history.push('/visitor/map')
            }
          }/>}/>
      <Route path="/visitor/product-view" exact component={EcProductDetail}/>
    </div>)
  }
}
