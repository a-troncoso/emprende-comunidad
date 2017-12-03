import React, {Component} from 'react';
import { Container, Card, Icon, Image } from 'semantic-ui-react'

import style from './MyProducts.scss'

export default class MyProducts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const products = [
      {
      name: 'Collares de madera',
      picUrl: 'http://files.jose-pablo-martin.webnode.es/200001201-8d1ad8e9f6/collar%20de%20madera%205%20piezas%2045%E2%82%AC%20-%2010cm.JPG',
      description: 'Hermosos collares de madera mnativa de árbol caído de origen selvático Valdiviano.',
      stars: 3,
      loves: 2,
      comments: 5
    },
      {
      name: 'Quequitos cannabicos',
      picUrl: 'https://www.royalqueenseeds.es/modules/prestablog/themes/royalqueenseeds/up-img/301.jpg?updtime=-111300011-62169985172',
      description: 'Ricos queques de cannabis hechos con leche y mantequilla de marihuana.',
      stars: 4,
      loves: 8,
      comments: 9
    },
      {
      name: 'Galletas artesanales',
      picUrl: 'https://i.pinimg.com/originals/91/19/8d/91198dd16d4739a8141a3ba749b254a7.jpg',
      description: 'Galletas de maizena y glaceado de chocolate hechas por mi abuelita.',
      stars: 0,
      loves: 0,
      comments: 0
    },
      {
      name: 'Cristales',
      picUrl: 'https://conexioncristalina.files.wordpress.com/2014/02/espiral-de-cristales.jpg',
      description: 'Cristales de todo tipo.',
      stars: 2,
      loves: 0,
      comments: 4
    }

    ]
    return (
      <Container className={style.root}>
        <Card.Group>
        {products.map((product, key) => {
          return (
            <Card key={key}>
              <Image src={product.picUrl} />
              <Card.Content>
                <Card.Header>
                  {product.name}
                </Card.Header>
                {/*<Card.Meta>
                  <span className='date'>
                    Joined in 2015
                  </span>
                </Card.Meta>*/}
                <Card.Description>
                  {product.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='star' />
                  {product.stars}
                </a>
                <a>
                  <Icon name='heart' />
                  {product.loves}
                </a>
                <a>
                  <Icon name='comment' />
                  {product.comments}
                </a>
              </Card.Content>
            </Card>
          )
        })}
        </Card.Group>

      </Container>
    );
  }
}

MyProducts.propTypes = {
};
