import React, {Component} from 'react'
import {Container, Image} from 'semantic-ui-react'

import style from './Splash.scss'
import logo from '@/assets/images/community-logo.jpg'

export default class Splash extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container className={style.root} textAlign="center" onClick={() => {this.props.history.push('/visitor/map')}}>
        <div className={style.mainContent}>
          <Image alt="community_logo" src={logo} size="medium"></Image>
          <p className={style.instruction}>Toque la pantalla para ingresar...</p>
        </div>
      </Container>
    )
  }
}
