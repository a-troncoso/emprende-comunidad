import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import {Menu, MainButton, ChildButton} from 'react-mfb'
import EcUserFinderInput from '../UserFinderInput'
import EcOwnMarker from '../OwnMarker'
import EcMarker from '../Marker'
import geolocationService from '../../services/geolocation'
import firebase from 'firebase'

import style from './UserFinder.scss'

export default class UserFinder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      ownPosition: {
        lat: 0,
        lng: 0
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
    // firebase.databse().ref() -> referencia a la base de datos
    const messageRef = firebase.database().ref().child('users')
    let users = []
    // child_added -> evento q se ejecuta cada vez q se agrega algo a la bd
    // snapshot -> captura de la bd en ese momento
    // napshot.val() -> valor q contiene snapshot
    messageRef.on('child_added', snapshot => {
      users = users.concat(snapshot.val())
      this.setState({users})
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
    let watchId = null

    if (!geolocation) {
      reject(new Error('Geolocation not supported'))
    }

    watchId = geolocation.watchPosition(position => {
      this.setState({
        ownPosition: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
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
    const user = {
      image: 'https://randomuser.me/api/portraits/thumb/men/51.jpg'
    }
    return (
      <div className={style.root}>
        <EcUserFinderInput className={style.userFinderInput}></EcUserFinderInput>

        <Menu effect="zoomin" method="hover" position="br">
          <MainButton iconResting="ion-ios-eye" iconActive="ion-ios-eye-outline"/>
          <ChildButton icon="ion-ios-navigate" label="Ver mapa" onClick={() => this.props.history.push('/user-finder-map')}/>
          <ChildButton icon="ion-android-list" label="Ver lista" onClick={() => this.props.history.push('/users-list')}/>
        </Menu>

        {this.state.showMap && <GoogleMapReact bootstrapURLKeys={{
          key: 'AIzaSyC0FT8GbyxW9iqYx65r0ibCUpY78sjrRhs',
          language: 'es'
        }} center={this.state.center} defaultZoom={this.state.zoom}>
          <EcOwnMarker lat={this.state.ownPosition.lat} lng={this.state.ownPosition.lng}></EcOwnMarker>
          {this.state.users.map((user, key) => {
            return (
              <EcMarker lat={user.location.lat} lng={user.location.lng} user={user} key={key}></EcMarker>
            )
          })}
        </GoogleMapReact>}
      </div>
    )
  }
}