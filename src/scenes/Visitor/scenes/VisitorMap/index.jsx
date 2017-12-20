import React, {Component} from 'react'
import EcMap from '@/components/Map'
import EcWantSellButton from './components/WantSellButton'

export default class VisitorMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <EcMap onGoToProductDetail={() => {
          this.props.history.push('/visitor/product-view')
        }}></EcMap>
      <EcWantSellButton onWantBeSeller={() => {this.props.history.push('/visitor/register-stepper')}}></EcWantSellButton>
    </div>);
  }
}

VisitorMap.propTypes = {
};
