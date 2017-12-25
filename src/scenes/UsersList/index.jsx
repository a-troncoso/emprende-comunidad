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
    const messageRef = firebase.database().ref().child('users')
      let users = [],
        user = {}
      messageRef.on('child_added', snapshot => {
        user = snapshot.val()
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

    render() {
      return (<Container className={style.root}>
        <Segment vertical>
          <List divided relaxed="very" selection verticalAlign='middle' size="large">
            {
              this.state.users.map((user, key) => {
                return (<List.Item onClick={() => this.onShowProducts(user.id)} key={key}>
                  <Image avatar src={user.image}/>
                  <List.Content>
                    <List.Header>{user.name} {user.lastName}</List.Header>
                  </List.Content>
                  {
                    user.showProducts && <List divided  verticalAlign='middle'>
                        {
                          user.products.map((product, key) => {
                            return (<List.Item onClick={this.props.onGoToProductDetail} key={key}>
                              <Image avatar src={product.image}/>
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
