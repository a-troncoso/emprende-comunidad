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
  }

  render() {
    return (
      <Container className={style.root}>
        <Image className={style.avatarPic} alt="avatar_pic" src={defaultAvatarPic} size='tiny' shape="circular"/>
        <Segment textAlign="center" vertical><EcDataTextField data='Alvaro Troncoso Vivanco'></EcDataTextField></Segment>
        <Segment textAlign="center" vertical><EcDataTextField data='alvaro.mc2@gmail.com'></EcDataTextField></Segment>
        <Segment textAlign="center" vertical><EcDataTextField data='Aún no ingresas tu dirección'></EcDataTextField></Segment>
      </Container>
    )
  }
}

MyAccount.propTypes = {}
