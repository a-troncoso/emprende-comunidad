import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Image} from 'semantic-ui-react'

import defaultImagePic from '@/assets/images/default-image.png'
import style from './ImageInputFile.scss'

export default class ImageInputFile extends Component {
  constructor(props) {
    super(props)

    this.onFileChange = this.onFileChange.bind(this)
  }

  componentWillMount() {
    if (!this.props.value) {
      this.props.onChangeImage(defaultImagePic)
    }
  }

  onFileChange(e, _file) {
    const file = _file || (
        e.target.files.length > 0 ? e.target.files[0] : null),
      pattern = /image-*/,
      reader = new FileReader()

    if (!file) return

    if (!file.type.match(pattern)) {
      alert('Formato inválido')
      // Aqui abrir modal con el mensaje formato no valido
      return
    }

    reader.onload = (e) => {
      this.props.onChangeImage(reader.result, file)
    }

    reader.readAsDataURL(file)
  }

  render() {
    const shape = this.props.shape
    return (
      <div className={style.root}>
        <label className={style.label}>
          <input className={style.avatarFile} onChange={this.onFileChange} ref="upload" type="file" accept="image/*"/>
          <Image className={style.avatarPic} alt="avatar_pic" src={this.props.value} size='small' shape={shape}/>
        </label>
      </div>)
  }
}

ImageInputFile.propTypes = {
  value: PropTypes.string.isRequired,
  shape: PropTypes.string,
  onChangeImage: PropTypes.func
}
