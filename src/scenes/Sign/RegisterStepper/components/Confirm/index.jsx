import React from 'react'
import {Image, Header} from 'semantic-ui-react'

import checkEmailImage from '@/assets/images/envelope-email-sent.png'
import style from './Confirm.scss'

const Confirm = (props) => {
  return (
    <div>
      <Header textAlign="center" as='h4'>Ahora revisa tu correo, ¡desde ahí podrás activar tu publicación!</Header>
      <Image size="large" className={style.checkEmailImage} src={checkEmailImage} centered></Image>
    </div>
  )
}

export default Confirm
