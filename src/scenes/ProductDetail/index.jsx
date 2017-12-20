import React, {Component} from 'react'
import {
  Image,
  Container,
  Item,
  Comment,
  Header
} from 'semantic-ui-react'
import StarRatingComponent from 'react-star-rating-component'
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
            avatarUrl: '',
            name: ''
          },
          publicationDate: '',
          comment: ''
        }]
      }
    }
  }

  componentWillMount() {}

  render() {
    return (
      <Container className={style.root}>

        <Item.Group>
          <Item className={style.item}>
            <div className={style.imageRating}>
              <Item.Image size="tiny" shape="circular" src={this.state.product.pictures
                ? this.state.product.pictures[0].url
                : ""}></Item.Image>
              <StarRatingComponent name="rate1" starCount={5} value={this.state.product.rating}/>
            </div>

            <Item.Content className={style.itemContent}>
              <Item.Header>{this.state.product.name}</Item.Header>
              <Item.Meta className={style.itemMeta}>{this.state.user.name} {this.state.user.lastName}</Item.Meta>
              <Item.Extra className={style.itemExtra}>{this.state.user.location.address}</Item.Extra>
              <Item.Description>{this.state.product.description}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>

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

        <Comment.Group>
          {this.state.product.comments.length > 0 && this.state.product.comments.map((comment, key) => {
            return (
              <Comment key={key}>
                <Comment.Avatar src={comment.user.avatarUrl} className={style.commentAvatar}/>
                <Comment.Content>
                  <Comment.Author className={style.commentAuthor}>{comment.user.name}</Comment.Author>
                  <Comment.Metadata>{comment.publicationDate}
                  </Comment.Metadata>
                  <Comment.Text>{comment.comment}</Comment.Text>
                </Comment.Content>
              </Comment>
            )
          })}
        </Comment.Group>
      </Container>
    )
  }
}

ProductDetail.propTypes = {}
