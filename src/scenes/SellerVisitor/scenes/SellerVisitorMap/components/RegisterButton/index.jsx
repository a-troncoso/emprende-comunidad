import React from 'react'
import PropTypes from 'prop-types'

import style from './RegisterButton.scss'

const RegisterButton = (props) => {
  return (
    <button className={style.root} onClick={props.onClick}>Registrarme</button>
  )
}

export default RegisterButton
