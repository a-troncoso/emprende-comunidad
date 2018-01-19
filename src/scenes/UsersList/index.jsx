import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Menu, MainButton, ChildButton} from 'react-mfb'
import {
  Item,
  Container,
  Image,
  Segment,
  Modal,
  Header,
  Button,
  Form,
  List
} from 'semantic-ui-react'
import StarRatingComponent from 'react-star-rating-component'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import defaultAvatarPic from '@/assets/images/default-avatar.png'

import style from './UsersList.scss'

export default class UsersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }

    this.handleGoToRoute = this.handleGoToRoute.bind(this)
  }

  componentWillMount() {
    this.handleUserAdded()
  }

  onShowProducts(userId) {
    let users = this.state.users.map(user => {
      if (user.id === userId)
        user.showProducts = !user.showProducts
      return user
    })

    this.setState({users})
  }

  handleUserAdded() {
    const usersRef = firebase.database().ref().child('users')
    let users = [],
      products = []

    usersRef.on('child_added', async (snapshot) => {
      let user = snapshot.val()
      products = await this.getUserProducts(user)
      user.products = products
      user.showProducts = false
      users = users.concat(user)
      this.setState({users})
    })
  }

  handleGoToRoute(params) {
    this.props.history.push({
      pathname: `/app/product-view`,
      state: params
    })
  }

  /*
    Funcion que obtiene los productos de un usuario
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

  render() {
    let srcUserImage = '',
      userFullName = ''

    return (<Container className={style.root}>
      <Segment vertical>
        <List divided relaxed="very" selection verticalAlign='middle' size="large">
          {
            this.state.users.map((user, key) => {
              srcUserImage = user.image || defaultAvatarPic
              userFullName = (!user.name && !user.lastName) ? 'Usuario anónimo' : `${user.name} ${user.lastName}`
              return (<List.Item onClick={() => this.onShowProducts(user.id)} key={key}>
                <Image avatar src={srcUserImage}/>
                <List.Content>
                  <List.Header>{userFullName}</List.Header>
                </List.Content>
                {
                  user.showProducts && <List divided verticalAlign='middle'>
                      {
                        user.products.map((product, key) => {
                          return (<List.Item onClick={this.props.onGoToProductDetail} key={key}>
                            <Image avatar src={product.pictureUrl}/>
                            <List.Content>
                              <List.Header>{product.name}</List.Header>
                            </List.Content>
                          </List.Item>)
                        })
                      }</List>
                }</List.Item>)
            })
          }
        </List>
      </Segment>
      <Menu effect="zoomin" method="hover" position="bl">
        <MainButton iconResting="ion-ios-eye" iconActive="ion-ios-eye-outline"/>
        <ChildButton icon="ion-ios-navigate" label="Ver mapa" onClick={this.props.onGoToMap}/>
        <ChildButton icon="ion-android-list" label="Ver lista" onClick={this.props.onGoToUsersList}/>
      </Menu>
    </Container>)
  }

}

UsersList.propTypes = {
  onGoToProductDetail: PropTypes.func.isRequired,
  onGoToUsersList: PropTypes.func.isRequired,
  onGoToMap: PropTypes.func.isRequired,
}
