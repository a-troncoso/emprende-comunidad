import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from 'semantic-ui-react'

import style from './UserFinderInput.scss'

export default class UserFinderInput extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const rootClasses = !this.props.profile ? [style.root, style.seller] : [style.root]

    return (
      <div className={rootClasses.join(' ')}>
        <Input type="text" icon='search' fluid placeholder="Busca usuarios o lugares aquí"></Input>
      </div>
    )
  }
}

UserFinderInput.propTypes = {
  profile: PropTypes.string
}
