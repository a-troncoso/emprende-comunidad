import React, {Component} from 'react'
import {
  Image,
  Container,
  Item,
  Header
} from 'semantic-ui-react'
import EcProductDetailHeader from './components/ProductDetailHeader'
import EcProductComments from './components/ProductComments'
import Slider from 'react-slick'

import style from './ProductDetail.scss'

export default class ProductDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        name: 'Juana',
        lastName: 'Machuca',
        location: {address: 'Villa Los Alerces #2214'}
      },
      product: {
        pictures: [{url:'https://www.arcuma.com/dr.cannabis/pics/temp-0000-cnbc.jpg'}],
        rating: 5,
        name: 'Quequito canábico',
        description: 'Rico rico todo muy rico',
        price: '1200',
        comments: [{
          user: {
            avatarUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
            name: 'Claudia Miranda'
          },
          publicationDate: '23-02-2018',
          comment: 'Bastante buenas'
        }]
      }
    }
  }

  render() {
    return (
      <Container className={style.root}>

        <EcProductDetailHeader
          productImg={this.state.product.pictures[0].url}
          productName={this.state.product.name}
          userFullName={`${this.state.user.name} ${this.state.user.lastName}`}
          userAddress={this.state.user.location.address}
          productDescription={this.state.product.description}
          productRating={this.state.product.rating}></EcProductDetailHeader>

        <Slider infinite={false} slidesToShow={3} slidesToScroll={1}>
          {this.state.product.pictures.length > 0 && this.state.product.pictures.map((pic, key) => {
            return (
              <div key={key}>
                <Image className={style.sliderImage} src={pic.url}></Image>
              </div>
            )
          })}
        </Slider>

        <h2 className={style.price}>$ {this.state.product.price}</h2>

        <hr></hr>

        <EcProductComments comments={this.state.product.comments}></EcProductComments>
      </Container>
    )
  }
}

ProductDetail.propTypes = {}
