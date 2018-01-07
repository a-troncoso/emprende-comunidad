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
  }

  componentWillMount() {
    this.handleGetCenterMapPosition()
    this.handleUserAdded()

  }

  handleUserAdded() {
    let {users} = this.state, {ownMarker} = this.state
    const usersRef = firebase.database().ref().child('users')
    const userSellerId = this.props.userId

    usersRef.on('child_added', snapshot => {
      console.info('KEY ->', snapshot.key)

      // Si el id usuario que se está consultando de la lista de usuarios es distinto del id usuario vendedor-visitante
      // Se agrega a la lista de usuarios
      if (snapshot.key !== userSellerId) {
        users = users.concat(snapshot.val())
        this.setState({users})
      } else {
        ownMarker.user = snapshot.val()
        this.setState({ownMarker})
      }
    })
  }

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

  handleGetCurrentPosition() {
    const geolocation = navigator.geolocation
    let watchId = null, {ownMarker} = this.state

    if (!geolocation) {
      reject(new Error('Geolocation not supported'))
    }

    watchId = geolocation.watchPosition(position => {
      ownMarker.lat = position.coords.latitude
      ownMarker.lng = position.coords.longitude
      this.setState({
        ownMarker,
        showMap: true
      })
    }, () => {
      throw 'An error has ocurred with geolocation'
    }, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    })
  }

  render() {
    return (<div className={style.root}>
      <EcUserFinderInput className={style.userFinderInput}></EcUserFinderInput>

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
              {/* Si se ingresa al mapa con perfil seller-visitor y se ha establecido la data del usuario vendedor
                (seteada en la func "handleUserAdded") */}
              { (this.props.profile == 'seller-visitor' && this.state.ownMarker.user) ? (
                <EcMarker
                  lat={this.state.ownMarker.lat}
                  lng={this.state.ownMarker.lng}
                  onGoToProductDetail={this.props.onGoToProductDetail}
                  user={this.state.ownMarker.user}
                  type="own"></EcMarker>

              ) : (
                <EcOwnMarker
                  lat={this.state.ownMarker.lat}
                  lng={this.state.ownMarker.lng}></EcOwnMarker>
              )
              }
            {
              this.state.users.map((user, key) => {
                return (
                  <EcMarker
                    key={key}
                    lat={user.location.lat}
                    lng={user.location.lng}
                    onGoToProductDetail={this.props.onGoToProductDetail}
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
