import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Image,
  Segment,
  Modal,
  Header,
  Button,
  Form
} from 'semantic-ui-react'

export default class DataTextField extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Modal trigger={<div>{this.props.data}</div>}>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Input label="Nombre" placeholder="Nombre"></Form.Input>
              <Form.Input label="Apellidos" placeholder="Apellidos"></Form.Input>
            </Form>
          </Modal.Description>
          <Button type="submit" className="primary" fluid>Guardar</Button>
        </Modal.Content>
      </Modal>
    )
  }
}

DataTextField.propTypes = {
  data: PropTypes.string.isRequired
}
