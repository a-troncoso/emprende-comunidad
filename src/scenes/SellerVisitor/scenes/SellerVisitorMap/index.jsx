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
    console.log(this.props.match.params.id)
    const userSellerId = this.props.match.params.id

    const usersRef = firebase.database().ref().child('users').child(userSellerId)
    usersRef.update({
      active: true,
      location: {
        "address": "Diagonal Paraguay con Vicuña Mackena",
        "lat": -33.4315604,
        "lng": -70.6855855
      }
    })

  }

  handleRegister() {
    this.props.history.push('/seller-visitor/register')
  }

  handleCancel() {
    this.setState({showImportantMessage: false})
  }

  render() {
    return (<div>
      {this.state.showImportantMessage && <EcImportantMessage onAccept={this.handleRegister} onCancel={this.handleCancel}></EcImportantMessage>}
      <EcMap onGoToProductDetail={() => {
          this.props.history.push('/seller-visitor/product-view')
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
