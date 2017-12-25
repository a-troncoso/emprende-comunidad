import React, {Component} from 'react';
import {
  Container,
  Image,
  Segment,
  Modal,
  Header,
  Button,
  Form,
  List
} from 'semantic-ui-react'

import style from './Settings.scss'

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className={style.root}>
        <Segment textAlign="center" vertical>
          <List divided relaxed="very" size="large" selection>
            <List.Item>
              <List.Content>
                <List.Header>Programar visibilidad</List.Header>
                <span className="help-text">Para que automáticamente aparezcas en la aplicación los días y las horas que quieras</span>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </Container>
    );
  }
}

Settings.propTypes = {
};
