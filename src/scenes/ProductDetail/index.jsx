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
import firebase from 'firebase'

import style from './ProductDetail.scss'

export default class ProductDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        name: 'Juana',
        lastName: 'Machuca',
        location: { address: 'Villa Los Alerces #2214' }
      }
      // product: {
      //   pictureUrl: 'https://www.arcuma.com/dr.cannabis/pics/temp-0000-cnbc.jpg',
      //   rating: 5,
      //   name: 'Quequito canábico',
      //   description: 'Rico rico todo muy rico',
      //   price: '1200',
      //   comments: [{
      //     user: {
      //       avatarUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
      //       name: 'Claudia Miranda'
      //     },
      //     publicationDate: '23-02-2018',
      //     comment: 'Bastante buenas'
      //   }]
      // }
    }
  }

  async componentWillMount() {
    this.getUserData()
    this.getProductData()
  }

  async getUserData() {
    const userId = this.props.match.params.id
    const snapshot = await firebase.database().ref('users/' + userId).once('value')
    const snapshotVal = snapshot.val()
    console.log('user data: ', snapshotVal)
  }

  async getProductData() {
    const productUid = this.props.match.params.productUid
    const snapshot = await firebase.database().ref('products/' + productUid).once('value')
    const snapshotVal = snapshot.val()
    console.log('product data: ', snapshotVal)
    let product = {}
    product.pictureUrl = snapshotVal.pictureUrl
    product.name = snapshotVal.name
    product.description = snapshotVal.description
    this.setState({product}, () => console.log(this.state))
  }

  render() {
    return (
      <Container className={style.root}>
        {
          this.state.product && <EcProductDetailHeader
          productImg={this.state.product.pictureUrl}
          productName={this.state.product.name}
          userFullName={`${this.state.user.name} ${this.state.user.lastName}`}
          userAddress={this.state.user.location.address}
          productDescription={this.state.product.description}
          productRating={this.state.product.rating}></EcProductDetailHeader>
        }
        {
          this.state.product && <Slider infinite={false} slidesToShow={3} slidesToScroll={1}>
            {
              this.state.product.pictures && this.state.product.pictures.length > 0 && this.state.product.pictures.map((pic, key) => {
                return (
                  <div key={key}>
                    <Image className={style.sliderImage} src={pic.url}></Image>
                  </div>
                )
              })
            }
          </Slider>
        }
        {
          this.state.product && <h2 className={style.price}>$ {this.state.product.price}</h2>
        }

        <hr></hr>

        {
          this.state.product && this.state.product.comments && <EcProductComments comments={this.state.product.comments}></EcProductComments>
        }
      </Container>
    )
  }
}

ProductDetail.propTypes = {}
