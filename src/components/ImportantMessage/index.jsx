import React, {Component} from 'react'
import {Header, Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import style from './ImportantMessage.scss'

export default class ImportantMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className={style.root}>
      <div className={style.messageContainer}>
        <Header className={style.title} textAlign="center" as='h2'>¡Bienvenido vendedor de visita!</Header>
        <Header className={style.para1} textAlign="center" as='h3'>Ahora ya apareces en el mapa con tu producto, te recordamos que al cerrar la aplicación serás borrado junto a tu producto.</Header>
        <Header className={style.para2} textAlign="center" as='h3'>Si quieres guardar este y más productos puedes registrarte, <span className={style.emphasis}>sólo toma 30 segundos.</span></Header>
        <div className={style.options}>
          <Button className={style.acceptButton} onClick={this.props.onAccept}>Registrarme</Button>
          <Button className={style.cancelButton} onClick={this.props.onCancel}>Ahora no</Button>
        </div>
      </div>
    </div>)
  }
}

ImportantMessage.propTypes = {
  onAccept: PropTypes.func,
  onCancel: PropTypes.func
};
