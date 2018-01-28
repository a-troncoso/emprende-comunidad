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
    this.sellerVisitorUid = this.params.get('key')
    this.sellerVisitorData = null
  }

  async componentDidMount() {
    this.validateSellerVisitorUser()

    // Antes de cerrar la ventana, actualiza el perfil y su estado activo según validaciones
    window.addEventListener('beforeunload', async (ev) => {
      ev.preventDefault();
      // return ev.returnValue = 'Are you sure you want to close?'
      const userRef = firebase.database().ref(`users/${this.sellerVisitorUid}`)

      if (userRef.key !== 'null' && this.sellerVisitorData && this.sellerVisitorData.profile === 2 && this.sellerVisitorData.active) {
        userRef.update({
          profile: 4,
          active: false
        })
      }
    })
  }

  async validateSellerVisitorUser() {
    const userRef = firebase.database().ref(`users/${this.sellerVisitorUid}`)
    let snapshot = await userRef.once('value')
    this.sellerVisitorData = snapshot.val()
    /*
      Si se dió por query string la key del seller-visitor
      existe en la BD
      hay datos para el uid del seller-visitor
      tiene perfil 2 (seller-visitor)
      no está activo
      y el contador de accesos = 0
      => Se activa el usuario
    */
    if (this.sellerVisitorUid && userRef.key !== 'null' && this.sellerVisitorData && this.sellerVisitorData.profile === 2
        && !this.sellerVisitorData.active && this.sellerVisitorData.accessCounter === 0) {
      userRef.update({
        active: true,
        accessCounter: ++this.sellerVisitorData.accessCounter
      })
      this.setState({ sellerVisitorValid: true })
      snapshot = await userRef.once('value')
      this.sellerVisitorData = snapshot.val()
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
