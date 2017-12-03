import React, {Component} from 'react'
import EcDataTextField from './components/DataTextField'
import {
  Container,
  Image,
  Segment
} from 'semantic-ui-react'
import defaultAvatarPic from '@/assets/images/default-avatar.png'

import style from './MyAccount.scss'

export default class MyAccount extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: defaultAvatarPic
    }

    this.onFileChange = this.onFileChange.bind(this)
  }

  onFileChange(e, file) {
    // if (!file) return

    var file = file || (e.target.files.length > 0 ? e.target.files[0] : null),
        pattern = /image-*/,
        reader = new FileReader();

    if (!file) return

    if(!file.type.match(pattern)) {
      alert('Formato inválido');
      return;
    }

    reader.onload = (e) => {
      this.setState({
          imageSrc: reader.result
      });
    }

    reader.readAsDataURL(file);
}

  render() {
    const fields = [
      {
        name: 'nombre',
        value: 'Álvaro Troncoso',
        form:[{label: 'Nombre', placeholder: ''},{label: 'Apellidos', placeholder: ''}]
      },
      {
        name: 'email',
        value: 'alvaro.mc2@gmai.com',
        form: [{label: 'Email', placeholder: 'ejemplo@email.com'}]
      },
      {
        name: 'dirección o punto de referencia',
        value: null,
        form: [{label: 'Dirección o punto de referencia', placeholder: 'Ej: Calle Nueva #123 casa color verde oscuro'}]
      }
    ]

    return (
      <Container className={style.root}>
        <label>
          <input
            className={style.avatarFile}
            onChange={this.onFileChange}
            ref="upload"
            type="file"
            accept="image/*"/>
          <Image className={style.avatarPic} alt="avatar_pic" src={this.state.imageSrc} size='tiny' shape="circular"/>
        </label>
        <Segment textAlign="center" className={style.dataTextField} vertical>
          <EcDataTextField field={fields[0]}></EcDataTextField>
        </Segment>
        <Segment textAlign="center" className={style.dataTextField} vertical>
          <EcDataTextField field={fields[1]}></EcDataTextField>
        </Segment>
        <Segment textAlign="center" className={style.dataTextField} vertical>
          <EcDataTextField field={fields[2]}></EcDataTextField>
        </Segment>
      </Container>
    )
  }
}

MyAccount.propTypes = {}
