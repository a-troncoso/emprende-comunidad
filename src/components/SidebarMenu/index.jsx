import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import EcMap from '@/scenes/Map'
import EcUsersList from '@/scenes/UsersList'
import EcProductDetail from '@/scenes/ProductDetail'
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

import style from './SidebarMenu.scss'

export default class SidebarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }

    this.toggleVisibility = this.toggleVisibility.bind(this)
    this.handleGoTo = this.handleGoTo.bind(this)
  }

  toggleVisibility() {
    console.log(this.state)
    this.setState({
      visible: !this.state.visible
    })
  }

  handleGoTo(route) {
    console.log(this.props.history)
    this.props.history.push(`/app/${route}`)
  }

  render() {
    return (<div>
      <Button onClick={this.toggleVisibility} className={style.sidebarBtn} icon="sidebar"></Button>
      <Sidebar.Pushable as={Segment} className={style.sidebarPushable}>
        <Sidebar as={Menu} animation='overlay' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
          <Menu.Item name='home' className={style.menuItem} onClick={() => this.handleGoTo('my-account')}>
            <Icon name='user'/> Mi cuenta
          </Menu.Item>
          <Menu.Item name='gamepad' className={style.menuItem} onClick={() => this.handleGoTo('settings')}>
            <Icon name='settings'/> Ajustes
          </Menu.Item>
          <Menu.Item name='camera' className={style.menuItem} onClick={() => this.handleGoTo('my-products')}>
            <Icon name='dropbox'/> Mis productos
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Route path="/app/map" exact component={EcMap}/>
          <Route path="/app/users-list" exact component={EcUsersList}/>
          <Route path="/app/product-view" exact component={EcProductDetail}/>
          <Route path="/app/my-account" exact component={EcMyAccount}/>
          <Route path="/app/settings" exact component={EcSettings}/>
          <Route path="/app/my-products" exact component={EcMyProducts}/>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>)
  }
}

SidebarMenu.propTypes = {};
