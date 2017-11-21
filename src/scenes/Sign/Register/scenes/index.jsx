import React, {Component} from 'react'
import firebase from 'firebase'
import geolocationService from '../../services/geolocation'
import {Button, Form} from 'semantic-ui-react'

export default class Seller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seller: {
        fullName: '',
        coords: {
          latitude: 0,
          longitude: 0
        }
      },
      enterButton: {
        disabled: true
      }
    }

    this.handleChangeSellerFullName = this.handleChangeSellerFullName.bind(this)
    this.handleSubmitSeller = this.handleSubmitSeller.bind(this)
  }

  componentWillMount() {
    this.handleGetCenterMapPosition()
  }

  handleGetCenterMapPosition() {
    geolocationService.getGeolocation().then(success => {
      this.setState({
        seller: {
          fullName: '',
          coords: {
            address: 'Dirección test',
            latitude: success.coords.latitude,
            longitude: success.coords.longitude
          }
        },
        enterButton: {
          disabled: false
        }
      }, () => console.log())
    }).catch(error => {
      throw error
    })
  }

  handleAddSeller() {
    console.log(this.state)
    let seller = {
      id: Math.floor(Math.random() * 1000) + 1,
      image: `https://randomuser.me/api/portraits/thumb/women/${Math.floor(Math.random() * 100) + 1}.jpg`,
      fullName: this.state.seller.fullName,
      location: {
        address: 'Dirección test',
        lat: this.state.seller.coords.latitude,
        lng: this.state.seller.coords.longitude
      },
      products: 0
    }

    const usersRef = firebase.database().ref().child('users')
    const userID = usersRef.push()
    userID.set(seller)
  }

  handleChangeSellerFullName(event) {
    let seller = Object.assign({}, this.state.seller)
    seller.fullName = event.target.value

    this.setState({seller})
  }

  handleSubmitSeller() {
    this.handleAddSeller()
    this.props.history.push('/user-finder-map')
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>¿Cuál es tu nombre y apellido?</label>
            <input value={this.state.seller.fullName} onChange={this.handleChangeSellerFullName} placeholder='Nombre y Apellido'/>
          </Form.Field>
          <Button type='submit' onClick={this.handleSubmitSeller} disabled={this.state.enterButton.disabled}>Entrar</Button>
        </Form>
      </div>
    );
  }
}

Seller.propTypes = {};
