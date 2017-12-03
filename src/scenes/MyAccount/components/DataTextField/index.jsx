import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Header,
  Button,
  Form
} from 'semantic-ui-react'

import style from './DataTextField.scss'
export default class DataTextField extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let trigger = null

    if (this.props.field.value) {
      trigger = <p>{this.props.field.value}</p>
    } else {
      trigger = <p className={style.noFieldValue}>Aún no has ingresado tu {this.props.field.name}</p>
    }
    return (
      <Modal trigger={trigger} size="mini">
        <Modal.Content>
          <Modal.Description>
            <Form>
              {this.props.field.form.map((itemForm, key) => {return (
                <Form.Input label={itemForm.label} placeholder={itemForm.placeholder} key={key}></Form.Input>
                ) })}
                <Button type="submit" className="primary" fluid>Guardar</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

DataTextField.propTypes = {
  field: PropTypes.object.isRequired
}
