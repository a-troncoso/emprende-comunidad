import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import EcSplash from '@/scenes/Home/scenes/Splash'
import EcMap from '@/scenes/Map'
import EcUsersList from '@/scenes/UsersList'
import EcProductDetail from '@/scenes/ProductDetail'
import EcSeller from '@/scenes/Sign/Register'
import EcSettings from '@/scenes/Settings'
import EcMyAccount from '@/scenes/MyAccount'
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
    this.setState({ visible: !this.state.visible })
  }

  handleGoTo(route) {
    console.log(this.context)
    this.context.history.push(`/${route}`)
  }

  render() {

    return (<main>
      <Route path="/" exact component={EcSplash}/>
      <Route path="/register" exact component={EcSeller}/>

      <Button onClick={this.toggleVisibility} className={style.sidebarBtn} icon="sidebar"></Button>

      <Sidebar.Pushable as={Segment} className={style.sidebarPushable}>
        <Sidebar as={Menu} animation='overlay' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
          <Menu.Item name='home' className={style.menuItem} onClick={() => this.handleGoTo('my-account')}> <Icon name='user'/> Mi cuenta </Menu.Item>
          <Menu.Item name='gamepad' className={style.menuItem} onClick={() => this.handleGoTo('settings')}> <Icon name='settings'/> Ajustes </Menu.Item>
          <Menu.Item name='camera' className={style.menuItem} onClick={() => this.handleGoTo('my-products')}> <Icon name='dropbox'/> Mis productos </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Route path="/map" exact component={EcMap}/>
          <Route path="/users-list" exact component={EcUsersList}/>
          <Route path="/product-view" exact component={EcProductDetail}/>
          <Route path="/my-account" exact component={EcProductDetail}/>
          <Route path="/settings" exact component={EcProductDetail}/>
          <Route path="/my-products" exact component={EcProductDetail}/>
        </Sidebar.Pusher>
      </Sidebar.Pushable>

    </main>)
  }
}
