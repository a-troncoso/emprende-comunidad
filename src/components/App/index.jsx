import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import firebase from 'firebase'

import EcMain from '../Main'

import style from './App.scss'

firebase.initializeApp({
  apiKey: 'AIzaSyC6u07mPn0cBApV1fm7JheneVOkAAKDrOU',
  authDomain: 'emprende-comunid-1509237222922.firebaseapp.com',
  databaseURL: 'https://emprende-comunid-1509237222922.firebaseio.com',
  projectId: 'emprende-comunid-1509237222922',
  storageBucket: '',
  messagingSenderId: '166586638373'
});

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <EcMain></EcMain>
      </Router>
    )
  }
}
