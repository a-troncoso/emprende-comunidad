import React, {Component} from 'react'
import firebase from 'firebase'
import EcImportantMessage from '@/components/ImportantMessage'
import EcMap from '@/components/Map'
import EcRegisterButton from './components/RegisterButton'

export default class SellerVisitorMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showImportantMessage: true
    }

    this.handleRegister = this.handleRegister.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount() {
    this.validateSellerVisitorUser()
  }

  validateSellerVisitorUser() {
    const userSellerId = this.props.match.params.id

    firebase.database().ref(`users/${userSellerId}`).update({
      active: true
    })
  }

  handleRegister() {
    this.props.history.push('/seller-visitor/register')
  }

  handleCancel() {
    this.setState({showImportantMessage: false})
  }

  render() {
    const userSellerId = this.props.match.params.id
    return (<div>
      {
        this.state.showImportantMessage && <EcImportantMessage onAccept={this.handleRegister} onCancel={this.handleCancel}></EcImportantMessage>
      }
      <EcMap profile='seller-visitor' userId={userSellerId} onGoToProductDetail={(productUid, userUid) => {
          this.props.history.push(`/seller-visitor/${userUid}/product-view/${productUid}`)
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
