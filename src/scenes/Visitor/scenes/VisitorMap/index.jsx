import React, {Component} from 'react'
import EcMap from '@/components/Map'
import EcWantSellButton from './components/WantSellButton'

export default class VisitorMap extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <EcMap onGoToProductDetail={() => {
          this.props.history.push('/visitor/product-view')
        }} onGoToUsersList={() => {
          this.props.history.push('/visitor/users-list')
        }} onGoToMap={() =>
        {this.props.history.push('/visitor/map')}}></EcMap>
      <EcWantSellButton onClick={() => {
          this.props.history.push('/visitor/register-stepper')
        }}></EcWantSellButton>
    </div>)
  }
}

VisitorMap.propTypes = {}
