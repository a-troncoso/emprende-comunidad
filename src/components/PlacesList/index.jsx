import React, {PropTypes} from 'react';
import {Menu, MainButton, ChildButton} from 'react-mfb'
import {Image, Item, Segment} from 'semantic-ui-react'
import StarRatingComponent from 'react-star-rating-component'

export default class PlacesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Segment>
          <Segment.Group>
            <Segment>
              <Item.Image size='tiny' shape='circular' src='https://randomuser.me/api/portraits/thumb/men/51.jpg'/>
              <span>Stevie Feliciano</span>
              <Segment.Group>
                <Segment onClick={() => this.props.history.push('/product-view/1')}>
                  <Item.Image size='tiny' shape='circular' src='http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'/>
                  <span>Güatitas</span>
                  <StarRatingComponent name="rate1" starCount={5} value={3}/>
                </Segment>
                <Segment onClick={() => this.props.history.push('/product-view/2')}>
                  <Item.Image size='tiny' shape='circular' src='https://images.ssstatic.com/vendemos-a-todo-el-mundo-patas-de-pollo-gallina-y-cerdo-1537425n0-00000046.jpg'/>
                  <span>Patas de chancho</span>
                  <StarRatingComponent name="rate1" starCount={5} value={4}/>
                </Segment>
                <Segment onClick={() => this.props.history.push('/product-view/3')}>
                  <Item.Image size='tiny' shape='circular' src='http://www.productosdelbierzo.com/image/cache/data/Varios/quesopata3-500x500.jpg'/>
                  <span>Queso de pata</span>
                  <StarRatingComponent name="rate1" starCount={5} value={2}/>
                </Segment>
              </Segment.Group>
            </Segment>

            <Segment>
              <Item.Image size='tiny' shape='circular' src='https://randomuser.me/api/portraits/thumb/men/52.jpg'/>
              <span>Veronika Ossi</span>
            </Segment>
            <Segment>
              <Item.Image size='tiny' shape='circular' src='https://randomuser.me/api/portraits/thumb/men/53.jpg'/>
              <span>Jenny Hess</span>
            </Segment>

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

PlacesList.propTypes = {};
