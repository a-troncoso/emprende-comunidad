import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import EcSplash from '@/scenes/Home/scenes/Splash'
import EcMap from '@/scenes/Map'
import EcSeller from '@/scenes/Sign/Register'
import EcSellerVisitor from '@/scenes/SellerVisitor'
import EcRegisterStepper from '@/scenes/Sign/RegisterStepper'
import {
  Sidebar,
  Segment,
  Menu,
  Icon,
  Grid,
  Image,
  Container,
  Item,
  Comment,
  Header,
  Button
} from 'semantic-ui-react'
import EcSidebarMenu from '@/components/SidebarMenu'

import style from './Main.scss'

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false
    }

    this.toggleVisibility = this.toggleVisibility.bind(this)
    this.handleGoTo = this.handleGoTo.bind(this)
  }

  toggleVisibility() {
    console.log(this.props)
    this.setState({ visible: !this.state.visible })
  }

  handleGoTo(route) {
    history.push(`/${route}`)
  }

  render() {

    return (<main>
      <Route path="/" exact component={EcSplash}/>
      <Route path="/register" exact component={EcSeller}/>
      <Route path="/visitor" exact component={EcMap}/>
      <Route path="/seller-visitor" exact component={EcSellerVisitor}/>
      <Route path="/register-stepper" exact component={EcRegisterStepper}/>
      <Route path="/app" component={EcSidebarMenu}/>
    </main>)
  }
}
