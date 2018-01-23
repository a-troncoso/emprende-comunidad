import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Input} from 'semantic-ui-react'

export default class EnterEmail extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.emailInput.focus()
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.errorField) this[`${nextProps.errorField}Input`].focus()
  }

  render() {
    return (<div>
      <Form>
        <Form.Field>
          <label>Email</label>
          <Input
            ref={(input) => { this.emailInput = input }}
            error={this.props.errorField==='email'}
            type="email"
            name="email"
            value={this.props.email}
            onChange={this.props.onUpdateEmail}
            placeholder="correo@ejemplo.com"/>
        </Form.Field>
      </Form>
    </div>)
  }
}

EnterEmail.propTypes = {
  onUpdateEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  errorField: PropTypes.string
}
