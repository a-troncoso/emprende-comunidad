import React, {PropTypes, Component} from 'react'
import {
  Grid,
  Image,
  Container,
  Item,
  Comment,
  Header
} from 'semantic-ui-react'
import StarRatingComponent from 'react-star-rating-component'
import Slider from 'react-slick'

import style from './ProductView.scss'

export default class ProductView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      product: {}
    }
  }

  componentWillMount() {
    const products = [
      {
        id: 1,
        rating: 3,
        name: 'Gûatitas',
        user: {
          name: 'Juana Huencumilla',
          location: {
            name: 'Anibal Pinto esquina Manuel Montt',
            coords: {
              lat: 0,
              lng: 0
            }
          }
        },
        description: 'Ricas guatitas a la chilenas cocinadas en cocina a leña',
        pictures: [
          {
            main: true,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }, {
            main: false,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }, {
            main: false,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }, {
            main: false,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }
        ],
        price: 250,
        comments: [
          {
            user: {
              name: 'Patricio Palacios',
              avatarUrl: ''
            },
            comment: 'Ricas las watitas de la soa!',
            publicationDate: '23-09-2017'
          }, {
            user: {
              name: 'Patricio Palacios',
              avatarUrl: ''
            },
            comment: 'Ricas las watitas de la soa!',
            publicationDate: '23-09-2017'
          }
        ]
      }, {
        id: 2,
        rating: 2,
        name: 'Patas de chancho',
        user: {
          name: 'Miriam Castro',
          location: {
            name: 'Anibal Pinto esquina Manuel Montt',
            coords: {
              lat: 0,
              lng: 0
            }
          }
        },
        description: 'Hermosas patitas de chancho joven',
        pictures: [
          {
            main: true,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }, {
            main: false,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }, {
            main: false,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }, {
            main: false,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }
        ],
        price: 250,
        comments: [
          {
            user: {
              name: 'Carolina Mancilla',
              avatarUrl: ''
            },
            comment: 'Malas las patas, vienen con la uña larga',
            publicationDate: '23-09-2017'
          }
        ]
      }, {
        id: 3,
        rating: 4,
        name: 'Queso de pata',
        user: {
          name: 'Gilbert Monroe',
          location: {
            name: 'Anibal Pinto esquina Manuel Montt',
            coords: {
              lat: 0,
              lng: 0
            }
          }
        },
        description: 'El quesito de pata como hecho en el sur',
        pictures: [
          {
            main: true,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }, {
            main: false,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }, {
            main: false,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }, {
            main: false,
            url: 'http://2.bp.blogspot.com/-rtumTUYx4WA/T_WslaSRdyI/AAAAAAAAANM/Kt7_h9JDn5w/s1600/guatitas-a-la-jardinera.jpg'
          }
        ],
        price: 250,
        comments: [
          {
            user: {
              name: 'Angelica Castro',
              avatarUrl: ''
            },
            comment: 'Recomendado 1000% todo el rato!, se pasaron los quesitos de la tía',
            publicationDate: '23-09-2017'
          }, {
            user: {
              name: 'Pedro Aznar',
              avatarUrl: ''
            },
            comment: 'Bastante buono el questo ah...',
            publicationDate: '23-09-2017'
          }
        ]
      }
    ]

    const productId = parseInt(this.props.match.params.productId)
    const product = products.filter((product) => product.id === productId)[0]
    this.setState({product})
  }

  render() {
    return (
      <Container className={style.root}>
        <Item.Group>
          <Item className={style.item}>
            <div className={style.imageRating}>
              <Item.Image size="tiny" shape="circular" src={this.state.product.pictures[0].url}></Item.Image>
              <StarRatingComponent name="rate1" starCount={5} value={this.state.product.rating}/>
            </div>

            <Item.Content className={style.itemContent}>
              <Item.Header>{this.state.product.name}</Item.Header>
              <Item.Meta className={style.itemMeta}>{this.state.product.user.name}</Item.Meta>
              <Item.Extra className={style.itemExtra}>{this.state.product.user.location.name}</Item.Extra>
              <Item.Description>{this.state.product.description}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>

        <Slider infinite={false} slidesToShow={3} slidesToScroll={1}>
          <div>
            <Image className={style.sliderImage} src="http://www.lacocinachilena.tk/wp-content/uploads/2015/05/Guatitas-jardinera.jpg"></Image>
          </div>
          <div>
            <Image className={style.sliderImage} src="http://www.platosycopas.cl/includes/thumbnailer.php/crop/650/405/guatitas-a-la-chillanesca-recetas-platosycopas-cocinachilena5816743.jpg"></Image>
          </div>
          <div>
            <Image className={style.sliderImage} src="http://www.labuenavida.cl/media/users/1/94631/images/public/83/1_003.jpg?v=1291210885933"></Image>
          </div>
          <div>
            <Image className={style.sliderImage} src="http://adm.1.cl/galeriasitios/Och/Och_14628_2857-04-GuatitasALaJardinera.jpg"></Image>
          </div>
          <div>
            <Image className={style.sliderImage} src="http://www.tipicochileno.cl/wp-content/themes/theme_gato2016/functions/timthumb.php?src=http://www.tipicochileno.cl/wp-content/uploads/2011/12/foto-guatitas1.jpg&w=400&h=178"></Image>
          </div>
          <div>
            <Image className={style.sliderImage} src="http://www.platosycopas.cl/includes/thumbnailer.php/crop/650/405/guatitas-a-la-chillanesca-recetas-platosycopas-cocinachilena5816743.jpg"></Image>
          </div>
        </Slider>

        <h2 className={style.price}>$ 1.500 el plato</h2>

        <hr></hr>

        <Comment.Group>
          <Comment>
            <Comment.Avatar src="https://randomuser.me/api/portraits/thumb/women/23.jpg"/>
            <Comment.Content>
              <Comment.Author className={style.commentAuthor}>Marysol Zuaznabar</Comment.Author>
              <Comment.Metadata>Hace 1 semana
              </Comment.Metadata>
              <Comment.Text>Se las mandó la soa Juanita, muy ricas sus watitas loco won!</Comment.Text>
            </Comment.Content>
          </Comment>
          <Comment>
            <Comment.Avatar src="https://randomuser.me/api/portraits/thumb/women/24.jpg"/>
            <Comment.Content>
              <Comment.Author className={style.commentAuthor}>Mila Troncoso Zuaznabar</Comment.Author>
              <Comment.Metadata>Hace 9 días
              </Comment.Metadata>
              <Comment.Text>A le wawé le gustan mucho las watitas de la ñora :B</Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </Container>
    )
  }
}

ProductView.propTypes = {}
