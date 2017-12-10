import React, {PropTypes} from 'react'
import EcImageInputFile from '@/components/ImageInputFile'
import {Form, Button, TextArea} from 'semantic-ui-react'

import defaultImagePic from '@/assets/images/default-image.png'
import style from './AddProducts.scss'

export default class AddProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {
        name: '',
        description: '',
        images: [{}]
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleChangeProductImage = this.handleChangeProductImage.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    const product = Object.assign({}, this.state.product)
    product[name] = value

    this.setState({
      product
    }, () => console.log(this.state.product))
  }

  handleChangeProductImage () {
    const product = Object.assign({}, this.state.product)
    product.images = product.images.concat([{}])
    this.setState({product})
  }

  render() {
    return (<div>
      <Form>
        <Form.Input label="Nombre" type="text" name="name" value={this.state.product.name} onChange={this.handleInputChange} placeholder="Nombre de tu producto"/>
        <Form.TextArea name="description" label="Descripción" rows={2} value={this.state.product.description} onChange={this.handleInputChange} placeholder='Descripción de tu producto' />
        <Form.Field>
          <label>Fotos</label>
          <div className={style.productsImages}>
            {this.state.product.images && this.state.product.images.map((image, key) => {
              return (
                <EcImageInputFile key={key} className={style.imageInputFile} onChangeImage={this.handleChangeProductImage}></EcImageInputFile>
              )
            }).reverse()}
          </div>
        </Form.Field>
      </Form>
    </div>);
  }
}

AddProducts.propTypes = {
};
