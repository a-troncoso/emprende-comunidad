import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {createHashHistory} from 'history'

import EcMain from '../Main'

import style from './App.scss'

export const history = createHashHistory()

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <EcMain></EcMain>
      </BrowserRouter>
    )
  }
}
