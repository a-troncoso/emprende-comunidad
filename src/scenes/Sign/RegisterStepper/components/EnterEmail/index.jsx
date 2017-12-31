import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form} from 'semantic-ui-react'

export default class EnterEmail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <Form>
        <Form.Input
          label="Email"
          type="email"
          name="email"
          value={this.props.email}
          onChange={this.props.onUpdateEmail}
          placeholder="correo@ejemplo.com"/>
      </Form>
    </div>)
  }
}

EnterEmail.propTypes = {
  onUpdateEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
}
