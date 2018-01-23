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
        name: '',
        lastName: '',
        location: { address: '' }
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
    const { user } = this.state
    const userId = this.props.match.params.id
    const snapshot = await firebase.database().ref('users/' + userId).once('value')
    const snapshotVal = snapshot.val()
    console.log('user data: ', snapshotVal)

    user.name = snapshotVal.name
    user.lastName = snapshotVal.lastName
    user.address = snapshotVal.location.address
    this.setState( {user} )
  }

  async getProductData() {
    const product = {}
    const productUid = this.props.match.params.productUid
    const snapshot = await firebase.database().ref('products/' + productUid).once('value')
    const snapshotVal = snapshot.val()
    console.log('product data: ', snapshotVal)

    product.pictureUrl = snapshotVal.pictureUrl
    product.name = snapshotVal.name
    product.description = snapshotVal.description
    product.pictures = snapshotVal.pictures
    this.setState({product})
  }

  render() {
    return (
      <Container className={style.root}>
        {
          this.state.product && <EcProductDetailHeader
          productImg={this.state.product.pictureUrl}
          productName={this.state.product.name}
          userName={this.state.user.name}
          userLastName={this.state.user.lastName}
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
          this.state.product && this.state.product.price && <h2 className={style.price}>$ {this.state.product.price}</h2>
        }

        {
          this.state.product && this.state.product.comments && <hr></hr> && <EcProductComments comments={this.state.product.comments}></EcProductComments>
        }
      </Container>
    )
  }
}

ProductDetail.propTypes = {}
