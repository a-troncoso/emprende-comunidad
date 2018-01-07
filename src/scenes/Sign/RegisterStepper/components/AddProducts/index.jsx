import React, {Component} from 'react'
import PropTypes from 'prop-types'
import EcImageInputFile from '@/components/ImageInputFile'
import {Form, Button, TextArea, Image} from 'semantic-ui-react'

import defaultAddImagePic from '@/assets/images/default-add-image.png'
import style from './AddProducts.scss'

export default class AddProducts extends Component {
  constructor(props) {
    super(props)
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
            <EcImageInputFile
              value={defaultAddImagePic}
              onChangeImage={(base64Image, file) => this.props.onUpdateProductsData({
                target: {
                  name: 'pictures',
                  value: base64Image,
                  file
                }
              })}></EcImageInputFile>
            {this.props.productsData[0].temporaryPictures && this.props.productsData[0].temporaryPictures.map((picture, key) => {
              return (
                <Image alt="picture_pic" src={picture.base64} size='small' key={key}/>
              )
            })}
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
