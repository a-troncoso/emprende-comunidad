import React, {PropTypes} from 'react';
import {Form} from 'semantic-ui-react'

export default class EnterData extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: ''
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    const data = Object.assign({}, this.state.data)
    data[name] = value

    this.setState({
      data
    }, () => console.log(this.state.data))
  }

  render() {
    return (<div>
      <Form>
        <Form.Input label="Email" type="email" name="email" value={this.state.data.email} onChange={this.handleInputChange} placeholder="correo@ejemplo.com"/>
      </Form>
    </div>);
  }
}

EnterData.propTypes = {};
