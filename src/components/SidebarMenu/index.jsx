import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import EcMap from '@/components/Map'
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
  Item,
  Button
} from 'semantic-ui-react'

import style from './SidebarMenu.scss'

export default class SidebarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarVisibility: false
    }

    this.toggleVisibility = this.toggleVisibility.bind(this)
    this.handleGoTo = this.handleGoTo.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  toggleVisibility() {
    if (!this.state.sidebarVisibility) {
      // attach/remove event handler on document
      document.addEventListener('click', this.handleOutsideClick, false)
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false)
    }

    this.setState({
      sidebarVisibility: !this.state.sidebarVisibility
    })
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node && this.node.contains(e.target)) {
      return
    }

    this.toggleVisibility()
  }

  handleGoTo(route) {
    this.setState({
      sidebarVisibility: !this.state.sidebarVisibility
    })
    this.props.history.push(`/app/${route}`)
  }

  render() {
    return (<div>
      <Sidebar.Pushable as={Segment} className={style.sidebarPushable}>
        <Button onClick={this.toggleVisibility} className={style.sidebarBtn} icon="sidebar"></Button>
        <div ref={node => { this.node = node }}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={this.state.sidebarVisibility} icon='labeled' vertical inverted>
            <Menu.Item name='map' className={style.menuItem} onClick={() => this.handleGoTo('map')}>
              <Icon name='map'/> Mapa
            </Menu.Item>
            <Menu.Item name='my-account' className={style.menuItem} onClick={() => this.handleGoTo('my-account')}>
              <Icon name='user'/> Mi cuenta
            </Menu.Item>
            <Menu.Item name='my-products' className={style.menuItem} onClick={() => this.handleGoTo('my-products')}>
              <Icon name='dropbox'/> Mis productos
            </Menu.Item>
            <Menu.Item name='settings' className={style.menuItem} onClick={() => this.handleGoTo('settings')}>
              <Icon name='settings'/> Ajustes
            </Menu.Item>
            <Menu.Item name='my-products' className={style.menuItem} onClick={() => this.props.history.push('/')}>
              <Icon name='log out'/> Salir
            </Menu.Item>
          </Sidebar>
        </div>
        <Sidebar.Pusher className={style.sidebarPusher}>
          <Route path="/app/map" exact render={routeProps => <EcMap {...routeProps} onGoToProductDetail={() => {
              this.props.history.push('/app/product-view')
            }}/>}/>
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
