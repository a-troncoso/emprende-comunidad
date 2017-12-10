import React, {Component} from 'react'
import EcDataTextField from './components/DataTextField'
import EcImageInputFile from '@/components/ImageInputFile'
import {Container, Image, Segment} from 'semantic-ui-react'

import defaultAvatarPic from '@/assets/images/default-avatar.png'
import style from './MyAccount.scss'

export default class MyAccount extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const fields = [
      {
        name: 'nombre',
        value: 'Álvaro Troncoso',
        form: [
          {
            label: 'Nombre',
            placeholder: ''
          }, {
            label: 'Apellidos',
            placeholder: ''
          }
        ]
      }, {
        name: 'email',
        value: 'alvaro.mc2@gmai.com',
        form: [
          {
            label: 'Email',
            placeholder: 'ejemplo@email.com'
          }
        ]
      }, {
        name: 'dirección o punto de referencia',
        value: null,
        form: [
          {
            label: 'Dirección o punto de referencia',
            placeholder: 'Ej: Calle Nueva #123 casa color verde oscuro'
          }
        ]
      }
    ]

    return (<Container className={style.root}  textAlign="center">
      <EcImageInputFile shape="circular" placeholder={defaultAvatarPic} className={style.imageInputFile}></EcImageInputFile>
      <Segment className={style.dataTextField} vertical>
        <EcDataTextField field={fields[0]}></EcDataTextField>
      </Segment>
      <Segment className={style.dataTextField} vertical>
        <EcDataTextField field={fields[1]}></EcDataTextField>
      </Segment>
      <Segment className={style.dataTextField} vertical>
        <EcDataTextField field={fields[2]}></EcDataTextField>
      </Segment>
    </Container>)
  }
}

MyAccount.propTypes = {}
