import React from 'react'
import {Image} from 'semantic-ui-react'

import checkEmailImage from '@/assets/images/check-your-email.jpg'
import style from './Confirm.scss'

const Confirm = (props) => {
  return (
    <div >
      <Image className={style.checkEmailImage} src={checkEmailImage}></Image>
    </div>
  )
}

export default Confirm
