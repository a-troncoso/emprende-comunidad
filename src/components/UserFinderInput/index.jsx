import React, {PropTypes, Component} from 'react'
import {Input} from 'semantic-ui-react'

import style from './UserFinderInput.scss'

export default class UserFinderInput extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={style.root}>
        <Input type="text" icon='search' fluid placeholder="Busca usuarios o lugares aquí"></Input>
      </div>
    )
  }
}

UserFinderInput.propTypes = {}
