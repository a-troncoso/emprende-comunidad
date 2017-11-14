import React, {Component} from 'react'
import firebase from 'firebase'
import geolocationService from '../../services/geolocation'

export default class Seller extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.handleGetCenterMapPosition()
    // this.handleAddSeller()
  }

  handleGetCenterMapPosition() {
    geolocationService.getGeolocation().then(success => {
      this.handleAddSeller(success.coords)
    }).catch(error => {
      throw error
    })
  }

  handleAddSeller(coords) {
    console.log(coords)
    let seller = {
      id: Math.floor(Math.random() * 100) + 1,
      image: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random() * 100) + 1}.jpg`,
      fullName: "Test User",
      location: {
        lat: coords.latitude,
        lng: coords.longitude
      },
      products: []
    }

    const usersRef = firebase.database().ref().child('users')
    const userID = usersRef.push()
    userID.set(seller)
  }

  render() {
    return (
      <div>MyComponent</div>
    );
  }
}

Seller.propTypes = {};
