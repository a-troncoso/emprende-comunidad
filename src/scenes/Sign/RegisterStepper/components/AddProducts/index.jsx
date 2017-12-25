import React, {Component} from 'react'
import PropTypes from 'prop-types'
import EcImageInputFile from '@/components/ImageInputFile'
import {Form, Button, TextArea} from 'semantic-ui-react'

import defaultImagePic from '@/assets/images/default-image.png'
import style from './AddProducts.scss'

export default class AddProducts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      product: {
        images: [{}]
      }
    }

    this.handleChangeProductImage = this.handleChangeProductImage.bind(this)
  }

  handleChangeProductImage () {
    const product = Object.assign({}, this.state.product)
    product.images = product.images.concat([{}])
    this.setState({product})
  }

  render() {
    return (<div>
      <Form>
        <Form.Input
          label="Nombre"
          type="text"
          name="name"
          value={this.props.productsData[0].name}
          onChange={this.props.onUpdateProductsData}
          placeholder="Nombre de tu producto"/>
        <Form.TextArea
          name="description"
          label="Descripción"
          rows={2}
          value={this.props.productsData[0].description}
          onChange={this.props.onUpdateProductsData}
          placeholder='Descripción de tu producto' />
        <Form.Field>
          <label>Fotos</label>
          <div className={style.productsImages}>
            {this.props.productsData[0].images && this.props.productsData[0].images.map((image, key) => {
              return (
                <EcImageInputFile
                  key={key}
                  className={style.imageInputFile}
                  name="pictures"
                  onChangeImage={() => this.props.onUpdateProductsData()}></EcImageInputFile>
              )
            }).reverse()}
          </div>
        </Form.Field>
      </Form>
    </div>)
  }
}

AddProducts.propTypes = {
  onUpdateProductsData: PropTypes.func.isRequired,
  productsData: PropTypes.array.isRequired
}
