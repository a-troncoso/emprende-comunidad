import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import EcSplash from '@/scenes/Home/scenes/Splash'
import EcMap from '@/scenes/Map'
import EcUsersList from '@/scenes/UsersList'
import EcProductDetail from '@/scenes/ProductDetail'
import EcSeller from '@/scenes/Sign/Register'
import EcMyAccount from '@/scenes/MyAccount'
import EcSettings from '@/scenes/Settings'
import EcMyProducts from '@/scenes/MyProducts'
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
    console.log(this.history)
    console.log(history)
    history.push(`/${route}`)
  }

  render() {

    return (<main>
      <Route path="/" exact component={EcSplash}/>
      <Route path="/register" exact component={EcSeller}/>
      <Route path="/app" component={EcSidebarMenu}/>
    </main>)
  }
}
