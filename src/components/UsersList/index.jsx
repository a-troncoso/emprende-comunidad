import React, {Component} from 'react';
import {Menu, MainButton, ChildButton} from 'react-mfb'
import {Image, Item, Segment} from 'semantic-ui-react'
import StarRatingComponent from 'react-star-rating-component'

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 1,
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
            }
          ],
          image: 'https://randomuser.me/api/portraits/med/women/84.jpg',
          fullName: 'Stevie Feliciano',
          rating: 3,
          showProducts: false
        }, {
          id: 2,
          products: [],
          image: 'https://randomuser.me/api/portraits/med/women/83.jpg',
          fullName: 'Veronika Ossi',
          showProducts: false
        }, {
          id: 3,
          products: [],
          image: 'https://randomuser.me/api/portraits/med/women/82.jpg',
          fullName: 'Jenny Hess',
          showProducts: false
        }
      ]
    }
  }

  onShowProducts(userId) {
    let users = this.state.users.map(user => {
      if (user.id === userId)
        user.showProducts = !user.showProducts
      return user
    })

    this.setState({users})
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
    );
  }
}

UsersList.propTypes = {};
