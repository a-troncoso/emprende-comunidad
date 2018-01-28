import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import EcSellerVisitorMap from './scenes/SellerVisitorMap'
import EcRegister from '@/scenes/Sign/Register'
import EcUsersList from '@/scenes/UsersList'
import EcProductDetail from '@/scenes/ProductDetail'
import firebase from 'firebase'
import 'url-search-params-polyfill'

export default class SellerVisitor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sellerVisitorValid: false
    }

    this.params = new URLSearchParams(props.location.search)
  }

  componentDidMount() {
    this.validateSellerVisitorUser()
  }

  async componentWillUnmount() {
    const sellerVisitorUid = this.params.get('key')
    const userRef = firebase.database().ref(`users/${sellerVisitorUid}`)
    const snapshot = await userRef.once('value')

    if (sellerVisitorData.profile === 2 && sellerVisitorData.active) {
      userRef.update({
        active: false
      })
    }
  }

  async validateSellerVisitorUser() {
    const sellerVisitorUid = this.params.get('key')
    const userRef = firebase.database().ref(`users/${sellerVisitorUid}`)
    const snapshot = await userRef.once('value')
    const sellerVisitorData = snapshot.val()
    /*
      Si se dió por query string la key del seller-visitor
      existe en la BD
      tiene perfil 2 (seller-visitor)
      y no está activo
      => Se actualiza la localizacion del usuario
    */
    if (sellerVisitorUid && userRef.key !== 'null' && sellerVisitorData.profile === 2 && !sellerVisitorData.active) {
      userRef.update({
        active: true
      })
      this.setState({ sellerVisitorValid: true })
    }
  }

  render() {
    return (<div>
      {this.state.sellerVisitorValid && <div>
        <Route path="/seller-visitor/map" component={EcSellerVisitorMap}/>
        <Route path="/seller-visitor/register" exact component={EcRegister}/>
        <Route
          path="/seller-visitor/users-list"
          exact
          render={
            props => <EcUsersList {...props} onGoToProductDetail={productUid => {
              this.props.history.push('/seller-visitor/product-view', { productUid })
            }} onGoToUsersList={() => {
              this.props.history.push('/seller-visitor/users-list')
            }} onGoToMap={() => {
              this.props.history.push('/seller-visitor/map')
            }}
          />}
        />
        <Route path="/seller-visitor/product-view" component={EcProductDetail}/>
      </div>}
    </div>)
  }
}

SellerVisitor.propTypes = {}
