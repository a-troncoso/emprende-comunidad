import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import {Menu, MainButton, ChildButton} from 'react-mfb'
import EcUserFinderInput from '../UserFinderInput'
import EcOwnMarker from '../OwnMarker'
import EcMarker from '../Marker'
import geolocationService from '../../services/geolocation'

import style from './UserFinder.scss'

// const Position = ({text}) => <div>{text}</div>

export default class UserFinder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 17,
      showMap: false,
      users: []
    }
  }

  componentWillMount() {
    this.getGeolocation()
    this.setState({
      users: this.getUsers()
    }, () => {console.log('from componentWillMount()', this.state)})
  }

  getGeolocation() {
    geolocationService.getGeolocation().then((success) => {
      this.setState({
        center: {
          lat: success.coords.latitude,
          lng: success.coords.longitude
        },
        showMap: true
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  getUsers() {
    const center = {
      lat: -33.4315604,
      lng: -70.6855855
    }
    return [{
      image: 'https://randomuser.me/api/portraits/thumb/men/51.jpg',
      location: { lat: center.lat, lng: center.lng }
    }]
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
        }} defaultCenter={this.state.center} defaultZoom={this.state.zoom}>
          <EcOwnMarker lat={this.state.center.lat} lng={this.state.center.lng}/>
          {/*{this.state.users.map((user, key)=> {
            <EcMarker
              lat={user.location.lat}
              lng={user.location.lng}
              user={user}
              key={key}/>
          })}*/}

          <EcMarker
            lat={this.state.users[0].location.lat}
            lng={this.state.users[0].location.lng}
            user={this.state.users[0]}/>

          {/*<EcMarker lat={this.state.center.lat - 0.002} lng={this.state.center.lng - 0.0012}/>
          <EcMarker lat={this.state.center.lat - 0.00014} lng={this.state.center.lng - 0.0004}/>
          <EcMarker lat={this.state.center.lat - 0.00009} lng={this.state.center.lng - 0.005}/>
          <EcMarker lat={this.state.center.lat - 0.00012} lng={this.state.center.lng + 0.005}/>
          <EcMarker lat={this.state.center.lat + 0.00012} lng={this.state.center.lng + 0.005}/>
          <EcMarker lat={this.state.center.lat + 0.000012} lng={this.state.center.lng + 0.0005}/>
          <EcMarker lat={this.state.center.lat + 0.00008} lng={this.state.center.lng + 0.00012}/>*/}
        </GoogleMapReact>}
      </div>
    )
  }
}
