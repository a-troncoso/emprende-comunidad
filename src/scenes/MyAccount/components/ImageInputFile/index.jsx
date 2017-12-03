import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Image} from 'semantic-ui-react'

import defaultAvatarPic from '@/assets/images/default-avatar.png'
import style from './ImageInputFile.scss'

export default class ImageInputFile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: defaultAvatarPic
    }

    this.onFileChange = this.onFileChange.bind(this)
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
      this.setState({imageSrc: reader.result})
    }

    reader.readAsDataURL(file)
  }

  render() {
    return (<label className={style.root}>
      <input className={style.avatarFile} onChange={this.onFileChange} ref="upload" type="file" accept="image/*"/>
      <Image className={style.avatarPic} alt="avatar_pic" src={this.state.imageSrc} size='small' shape="circular"/>
    </label>)
  }
}

ImageInputFile.propTypes = {}
