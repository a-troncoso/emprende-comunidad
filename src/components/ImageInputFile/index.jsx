import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Image} from 'semantic-ui-react'

import defaultImagePic from '@/assets/images/default-image.png'
import style from './ImageInputFile.scss'

export default class ImageInputFile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: ''
    }

    this.onFileChange = this.onFileChange.bind(this)
  }

  componentWillMount() {
    this.setState({imageSrc: this.props.placeholder || defaultImagePic})
  }

  onFileChange(e, file) {
    var file = file || (
        e.target.files.length > 0
        ? e.target.files[0]
        : null),
      pattern = /image-*/,
      reader = new FileReader()

    if (!file)
      return

    if (!file.type.match(pattern)) {
      alert('Formato inválido')
      return
    }

    reader.onload = (e) => {
      this.setState({
        imageSrc: reader.result
    })}

    reader.readAsDataURL(file)
    if (this.props.onChangeImage) this.props.onChangeImage()

  }

  render() {
    const shape = this.props.shape
    return (
      <div className={style.root}>
        <label className={style.label}>
          <input className={style.avatarFile} onChange={this.onFileChange} ref="upload" type="file" accept="image/*"/>
          <Image className={style.avatarPic} alt="avatar_pic" src={this.state.imageSrc} size='small' shape={shape}/>
        </label>
      </div>)
  }
}

ImageInputFile.propTypes = {
  shape: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeImage: PropTypes.func
}
