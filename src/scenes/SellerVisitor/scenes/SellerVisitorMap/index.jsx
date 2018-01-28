import React, {Component} from 'react'
import firebase from 'firebase'
import EcImportantMessage from '@/components/ImportantMessage'
import EcMap from '@/components/Map'
import EcRegisterButton from './components/RegisterButton'
import 'url-search-params-polyfill'

export default class SellerVisitorMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showImportantMessage: true
    }

    this.params = new URLSearchParams(props.location.search)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleRegister() {
    this.props.history.push('/seller-visitor/register')
  }

  handleCancel() {
    this.setState({ showImportantMessage: false })
  }

  render() {
    const sellerVisitorUid = this.params.get('key')
    return (<div>
      {
        this.state.showImportantMessage && <EcImportantMessage onAccept={this.handleRegister} onCancel={this.handleCancel}></EcImportantMessage>
      }
      <EcMap profile='seller-visitor' userId={sellerVisitorUid} onGoToProductDetail={ productUid => {
          this.props.history.push('/seller-visitor/product-view', { productUid })
        }} onGoToUsersList={() => {
          this.props.history.push('/seller-visitor/users-list')
        }} onGoToMap={() => {
          this.props.history.push('/seller-visitor/map')
        }}></EcMap>
        <EcRegisterButton onClick={this.handleRegister}></EcRegisterButton>
    </div>)
  }
}

SellerVisitorMap.propTypes = {}
