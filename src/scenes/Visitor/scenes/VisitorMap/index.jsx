import React, {Component} from 'react'
import EcMap from '@/components/Map'
import EcWantSellButton from './components/WantSell'

export default class VisitorMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <EcMap></EcMap>
      <EcWantSellButton onWantBeSeller={() => {this.props.history.push('/visitor/register')}}></EcWantSellButton>
    </div>);
  }
}

VisitorMap.propTypes = {
};
