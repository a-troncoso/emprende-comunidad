import React, {PropTypes} from 'react'
import GoogleMapReact from 'google-map-react'
import {Menu, MainButton, ChildButton} from 'react-mfb'
import EcUserFinderInput from '../UserFinderInput'
// import FaBeer from 'react-icons/fa/beer'
import {FaBeer, MdChat, MdCheck} from 'react-icons/md';

import style from './UserFinder.scss'

const Position = ({text}) => <div>{text}</div>

export default class UserFinder extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      center: { lat: 0, lng: 0 },
      zoom: 17,
      showMap: false
    }
  }

  getLocation() {
    const geolocation = navigator.geolocation

    const location = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error('Geolocation not Supported'))
      }

      geolocation.getCurrentPosition((position) => {
        resolve(position)
      }, () => {
        reject(new Error('Permission denied'))
      })
    })

    return location
  }

  componentWillMount() {
    this.getLocation().then((success) => {
      this.setState({
        center: {
          lat: success.coords.latitude,
          lng: success.coords.longitude
        },
        showMap: true
      }, () => {
        console.log(this.state)
      })
    })

  }

  render() {
    return (
      <div className={style.root}>
        <FaBeer />
        <EcUserFinderInput className={style.userFinderInput}></EcUserFinderInput>

        <Menu effect="zoomin" method="hover" position="br">
          <MainButton iconResting="asdasd" iconActive="ion-close-round"/>
          <ChildButton icon="ion-social-github" label="View on Github" href="https://github.com/nobitagit/react-material-floating-button/"/>
          <ChildButton icon="ion-social-octocat" label="Follow me on Github" href="https://github.com/nobitagit"/>
        </Menu>

        {this.state.showMap && <GoogleMapReact bootstrapURLKeys={{
          key: 'AIzaSyC0FT8GbyxW9iqYx65r0ibCUpY78sjrRhs',
          language: 'es'
        }} defaultCenter={this.state.center} defaultZoom={this.state.zoom}>
          <Position lat={this.state.center.lat} lng={this.state.center.lng} text={'YO'}/>
          <Position lat={-33.432865} lng={-70.683369} text={'*'}/>

          <Position lat={this.state.center.lat - 0.002} lng={this.state.center.lng - 0.0012} text={'*'}/>
          <Position lat={this.state.center.lat - 0.00014} lng={this.state.center.lng - 0.0004} text={'*'}/>
          <Position lat={this.state.center.lat - 0.00009} lng={this.state.center.lng - 0.005} text={'*'}/>
          <Position lat={this.state.center.lat - 0.00012} lng={this.state.center.lng + 0.005} text={'*'}/>
          <Position lat={this.state.center.lat + 0.00012} lng={this.state.center.lng + 0.005} text={'*'}/>
          <Position lat={this.state.center.lat + 0.000012} lng={this.state.center.lng + 0.0005} text={'*'}/>
          <Position lat={this.state.center.lat + 0.00008} lng={this.state.center.lng + 0.00012} text={'*'}/>
        </GoogleMapReact>}
      </div>
    )
  }
}
