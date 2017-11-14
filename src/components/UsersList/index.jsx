import React, {Component} from 'react'
import {Menu, MainButton, ChildButton} from 'react-mfb'
import {Image, Item, Segment} from 'semantic-ui-react'
import StarRatingComponent from 'react-star-rating-component'
import firebase from 'firebase'

export default class UsersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
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
    let users = [], user = {}
    messageRef.on('child_added', snapshot => {
      user = snapshot.val()
      user.showProducts = false
      users = users.concat(user)
      this.setState({users})
    })
  }

  render() {
    return (
      <div>
        <Segment>
          <Segment.Group>
            {this.state.users.map((user, key) => {
              return (
                <Segment key={user.id}>
                  <Item.Image size='tiny' shape='circular' src={user.image} onClick={() => this.onShowProducts(user.id)}/>
                  <span>{user.fullName}</span>
                  {user.showProducts && <Segment.Group>
                    {user.products.map((product) => {
                      return (
                        <Segment onClick={() => this.props.history.push(`/product-view/${product.id}`)} key={product.id}>
                          <Item.Image size='tiny' shape='circular' src={product.image}/>
                          <span>{product.name}</span>
                          <StarRatingComponent name="rate1" starCount={5} value={product.rating}/>
                        </Segment>
                      )
                    })}
                  </Segment.Group>}
                </Segment>
              )
            })}
          </Segment.Group>
        </Segment>

        <Menu effect="zoomin" method="hover" position="br">
          <MainButton iconResting="ion-ios-eye" iconActive="ion-ios-eye-outline"/>
          <ChildButton icon="ion-ios-navigate" label="Ver mapa" onClick={() => this.props.history.push('/user-finder-map')}/>
          <ChildButton icon="ion-android-list" label="Ver lista" onClick={() => this.props.history.push('/places-list')}/>
        </Menu>
      </div>
    )
  }
}

UsersList.propTypes = {}
