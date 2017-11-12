import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import {Menu, MainButton, ChildButton} from 'react-mfb'
import EcUserFinderInput from '../UserFinderInput'
import EcOwnMarker from '../OwnMarker'
import EcMarker from '../Marker'
import geolocationService from '../../services/geolocation'

import style from './UserFinder.scss'

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
    this.setState({users: this.getUsers()})
  }

  getGeolocation() {
    const geolocation = navigator.geolocation
    let watchId = null

    if (!geolocation) {
      reject(new Error('Geolocation not supported'))
    }

    watchId = geolocation.watchPosition((position) => {
      console.log(position.coords)
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        showMap: true
      })

    }, () => {
      reject(new Error('Permission denied'))
    }, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    })
  }

  getUsers() {
    return [
      {
        image: 'https://randomuser.me/api/portraits/thumb/men/50.jpg',
        location: {
          lat: -33.4315604,
          lng: -70.6855855
        },
        products: [
          {
            id: 1,
            name: 'Güatitas',
            image: 'https://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg',
            rating: 5
          }, {
            id: 2,
            name: 'Patas de chancho',
            image: 'https://images.ssstatic.com/vendemos-a-todo-el-mundo-patas-de-pollo-gallina-y-cerdo-1537425n0-00000046.jpg',
            rating: 4
          }
        ]
      }, {
        image: 'https://randomuser.me/api/portraits/thumb/men/51.jpg',
        location: {
          lat: -33.4305704,
          lng: -70.6845955
        },
        products: [
          {
            id: 1,
            name: 'Güatitas',
            image: 'https://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg',
            rating: 5
          }, {
            id: 2,
            name: 'Patas de chancho',
            image: 'https://images.ssstatic.com/vendemos-a-todo-el-mundo-patas-de-pollo-gallina-y-cerdo-1537425n0-00000046.jpg',
            rating: 4
          }, {
            id: 3,
            name: 'Queso de pata',
            image: 'https://images.ssstatic.com/vendemos-a-todo-el-mundo-patas-de-pollo-gallina-y-cerdo-1537425n0-00000046.jpg',
            rating: 2
          }, {
            id: 4,
            name: 'Sopaipillas',
            image: 'http://masmasa.cl/wp-content/uploads/2017/06/SOPAIPILLAS-COC.jpg',
            rating: 5
          }
        ]
      }
    ]
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
          <EcOwnMarker lat={this.state.center.lat} lng={this.state.center.lng}/>
          {this.state.users.map((user, key) => {
            return (<EcMarker lat={user.location.lat} lng={user.location.lng} user={user} key={key}/>)
          })}
        </GoogleMapReact>}
      </div>
    )
  }
}
