import React, {Component} from 'react'
import firebase from 'firebase'
import geolocationService from '@/services/geolocation'
import {Button, Form, Container, Checkbox, Image, Divider, Select, Input} from 'semantic-ui-react'
import logo from '@/assets/images/community-logo.jpg'

import style from './Register.scss'

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seller: {
        id: 0,
        image: '',
        name: '',
        lastName: '',
        email: '',
        password: '',
        countryCode: '',
        areaCode: '',
        phoneNumber: '',
        valueProduct: 'si',
        location: {
          address: '',
          lat: 0,
          lng: 0
        }
      },
      password: {
        show: false,
        type: 'password'
      },
      enterButton: {
        disabled: true
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this)
    this.handleSubmitSeller = this.handleSubmitSeller.bind(this)
    this.handleChangeValueProduct = this.handleChangeValueProduct.bind(this)
  }

  componentWillMount() {
    this.handleGetCenterMapPosition()
  }

  handleGetCenterMapPosition() {
    const seller = Object.assign({}, this.state.seller)
    const enterButton = Object.assign({}, this.state.enterButton)

    geolocationService.getGeolocation().then(success => {
      seller.location = {
        address: '',
        lat: success.coords.latitude,
        lng: success.coords.longitude
      }
      enterButton.disabled = false
      this.setState({seller, enterButton})
    }).catch(error => {
      throw error
    })
  }

  handleAddSeller() {
    let seller = {
      id: Math.floor(Math.random() * 1000) + 1,
      image: `https://randomuser.me/api/portraits/thumb/women/${Math.floor(Math.random() * 100) + 1}.jpg`,
      name: this.state.seller.name,
      lastName: this.state.seller.lastName,
      email: this.state.seller.email,
      location: {
        address: this.state.seller.location.address,
        lat: this.state.seller.location.lat,
        lng: this.state.seller.location.lng
      },
      products: 0
    }

    //Agregar usuario seller a firebase
    const usersRef = firebase.database().ref().child('users')
    const userID = usersRef.push()
    userID.set(seller)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name

    const seller = Object.assign({}, this.state.seller)
    seller[name] = value

    this.setState({
      seller
    }, () => console.log(this.state.seller))
  }


  handleChangeValueProduct() {
    // console.log(this.state.seller.valueProduct)
    const seller = Object.assign({}, this.state.seller)
    if (seller.valueProduct === 'si') {
      seller.valueProduct = 'no'
      console.log('abrir modal de valoraciones')
    } else {
      seller.valueProduct = 'si'
    }
    this.setState({seller})
  }

  handleToggleCheckbox() {
    const password = Object.assign({}, this.state.password)
    password.show = !password.show
    password.type = password.show ? 'text' : 'password'
    this.setState({password})
  }

  handleSubmitSeller() {
    this.handleAddSeller()
    this.props.history.push('/map')
  }

  render() {
    const countryOptions = [{ key: 'cl', value: 'cl', flag: 'cl', text: '+56' }]
    const areaOptions = [
      { key: '9', value: '9', text: '9' },
      { key: '8', value: '8', text: '8' },
      { key: '7', value: '7', text: '7' },
      { key: '6', value: '6', text: '6' },
    ]

    return (<div className={style.root}>
      <Image className={style.logo} alt="community_logo" src={logo} size='tiny' />

      <div className={style.registerOptions}>
        <Button className="facebook" fluid>Registro con Facebook</Button>
        <Divider horizontal>o</Divider>
        <Form className={style.form}>
          <Form.Group widths='equal'>
            <Form.Input label='Nombre' type="text" name="name" value={this.state.seller.name} onChange={this.handleInputChange} placeholder=''/>
            <Form.Input label='Apellidos' type="text" name="lastName" value={this.state.seller.lastName} onChange={this.handleInputChange} placeholder=''/>
          </Form.Group>
          <Form.Input type="email" label='Correo electrónico' name="email" value={this.state.seller.email} onChange={this.handleInputChange} placeholder=''></Form.Input>
          <Form.Group className={style.formGroupPassword}>
            <Form.Input label='Contraseña' className={style.inputPassword} type={this.state.password.type} name="password" value={this.state.seller.password} onChange={this.handleInputChange} placeholder=''></Form.Input>
            <Form.Checkbox type="checkbox" className={style.checkShowPass} label='Mostrar' name="showPassword" checked={this.state.password.show} onChange={this.handleToggleCheckbox}></Form.Checkbox>
          </Form.Group>
          <Form.Checkbox className={style.valueProductCheck} value={this.state.seller.valueProduct} onChange={this.handleChangeValueProduct} defaultChecked toggle label="Quiero que mis productos sean valorados" />
          <div className={`field ${style.phoneGroup}`}>
            <label>Teléfono</label>
            <Form.Group className={` ${style.phoneFields}`}>
              <Select placeholder='Código...' className={style.coutrySelector} options={countryOptions} value="cl"/>
              <Select placeholder='Código...' className={style.areaSelector} options={areaOptions} value="9"/>
              <Input type="number" name="phoneNumber" value={this.state.seller.phoneNumber} onChange={this.handleInputChange} placeholder='Teléfono'/>
            </Form.Group>
          </div>
          <Button type='submit' className="primary" onClick={this.handleSubmitSeller} disabled={this.state.enterButton.disabled} fluid>Regístrate</Button>
        </Form>
      </div>

    </div>);
  }
}

Register.propTypes = {};
