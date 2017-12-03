import React, {Component} from 'react';
import {
  Container,
  Image,
  Segment,
  Modal,
  Header,
  Button,
  Form
} from 'semantic-ui-react'

import style from './Settings.scss'

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className={style.root}>
        <Segment className={style.setting} textAlign="center"vertical>
          Programar visibilidad <span className="text-color--dev">(usuario vendedor)</span>
        </Segment>
        <Segment className={style.setting} textAlign="center"vertical>
          Quiero vender algo <span className="text-color--dev">(Usuario normal)</span>
        </Segment>
      </Container>
    );
  }
}

Settings.propTypes = {
};
