import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import GoogleMapReact from 'google-map-react'
import {Menu, MainButton, ChildButton} from 'react-mfb'
import EcUserFinderInput from './components/UserFinderInput'
import EcOwnMarker from './components/OwnMarker'
import EcMarker from './components/Marker'
import geolocationService from '@/services/geolocation/index.js'
import firebase from 'firebase'

import style from './Map.scss'

export default class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      ownMarker: {
        lat: 0,
        lng: 0,
        user: null
      },
      zoom: 17,
      showMap: false,
      users: []
    }

    this.watchId = null
  }

  componentDidMount() {
    this.handleGetCenterMapPosition()
    this.handleUserAdded()
  }

  componentWillUnmount() {
    // Cuando se desmonta el componente, se limpia el listener de geolocation
    navigator.geolocation.clearWatch(this.watchId);
  }

  /*
    Funcion que obtiene los usuarios
  */
  handleUserAdded() {
    let { users } = this.state, { ownMarker } = this.state, products = []
    const usersRef = firebase.database().ref().child('users')
    const userSellerId = this.props.userId

    usersRef.on('child_added', async (snapshot) => {
      /**
       * Si el usuario no está activo, no hace nada
       */
      let user = snapshot.val()
      if (!user.active) return

      products = await this.getUserProducts(user)
      user.products = products
      user.uid = snapshot.key
      console.log('new user', user)
      /**
        * Si el id usuario que se está consultando de la lista de usuarios
        * es distinto del id usuario vendedor-visitante
        * Se agrega a la lista de usuarios
      */
      if (snapshot.key !== userSellerId) {
        users = users.concat(user)
        this.setState({ users })
      } else {
        ownMarker.user = user
        this.setState({ ownMarker })
      }
    })
  }

  /**
    * Funcion que obtiene los productos de un usuario
  */
  async getUserProducts(user) {
    let productKeys = user.products, products = [], snapshot = {}, snapshotVal = {}
    for (let productKey in productKeys) {
      if (productKeys.hasOwnProperty(productKey) && productKeys[productKey]) {
        snapshot = await firebase.database().ref('products/' + productKey).once('value')
        snapshotVal = snapshot.val()
        snapshotVal.uid = productKey
        products = products.concat(snapshotVal)
      }
    }
    return products
  }

  /*
    Funcion que obtiene la localizacion actual y la establece como centro del mapa
  */
  handleGetCenterMapPosition() {
    geolocationService.getGeolocation().then(success => {
      this.setState({
        center: {
          lat: success.coords.latitude,
          lng: success.coords.longitude
        }
      })
      this.handleGetCurrentPosition()
    }).catch(error => {
      throw error
    })
  }

  /*
    Funcion que obtiene en todo momento la localizacion actual y la establece al marcador propio
  */
  handleGetCurrentPosition() {
    let {ownMarker} = this.state

    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
    }

    this.watchId = navigator.geolocation.watchPosition(position => {
      ownMarker.lat = position.coords.latitude
      ownMarker.lng = position.coords.longitude
      this.setState({
        ownMarker,
        showMap: true
      })
      this.updateUserPosition(ownMarker.lat, ownMarker.lng)
    }, () => {
      throw 'An error has ocurred with geolocation'
    }, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    })
  }

  updateUserPosition(lat, lng) {
    const userSellerId = this.props.userId
    // Sólo si se ha dado un userId por params, actualiza la posicion en BD
    if (userSellerId) {
      firebase.database().ref(`users/${userSellerId}`).update({
        location: {
          lat,
          lng
        }
      })
    }
  }

  render() {
    return (<div className={style.root}>
      <EcUserFinderInput className={style.userFinderInput} profile={this.props.profile}></EcUserFinderInput>

      <Menu effect="zoomin" method="hover" position="bl">
        <MainButton iconResting="ion-ios-eye" iconActive="ion-ios-eye-outline"/>
        <ChildButton icon="ion-ios-navigate" label="Ver mapa" onClick={this.props.onGoToMap}/>
        <ChildButton icon="ion-android-list" label="Ver lista" onClick={this.props.onGoToUsersList}/>
      </Menu>

      {
        this.state.showMap && <GoogleMapReact bootstrapURLKeys={{
              key: 'AIzaSyC0FT8GbyxW9iqYx65r0ibCUpY78sjrRhs',
              language: 'es'
            }} center={this.state.center} defaultZoom={this.state.zoom}>
              {/* Si se ingresa al mapa con perfil seller-visitor
                y se ha establecido la data del usuario vendedor
                (seteada en la func "handleUserAdded") */}
              { (this.props.profile == 'seller-visitor' && this.state.ownMarker.user) ? (
                <EcMarker
                  lat={this.state.ownMarker.lat}
                  lng={this.state.ownMarker.lng}
                  onGoToProductDetail={productUid => this.props.onGoToProductDetail(productUid)}
                  user={this.state.ownMarker.user}
                  type="own"></EcMarker>
              ) : (
                <EcOwnMarker lat={this.state.ownMarker.lat} lng={this.state.ownMarker.lng}></EcOwnMarker>
              )
              }
            {
              this.state.users.map((user, key) => {
                return (
                  <EcMarker
                    key={key}
                    lat={user.location.lat}
                    lng={user.location.lng}
                    onGoToProductDetail={productUid => this.props.onGoToProductDetail(productUid)}
                    user={user}
                    ></EcMarker>
                )
              })
            }
          </GoogleMapReact>
      }
    </div>)
  }
}

Map.propTypes = {
  onGoToProductDetail: PropTypes.func.isRequired,
  onGoToUsersList: PropTypes.func.isRequired,
  onGoToMap: PropTypes.func.isRequired,
  profile: PropTypes.string,
  userId: PropTypes.string
}
