import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import EcSplash from '@/scenes/Home/scenes/Splash'
import EcVisitor from '@/scenes/Visitor'
import EcSeller from '@/scenes/Sign/Register'
import EcSellerVisitor from '@/scenes/SellerVisitor'
import EcRegisterStepper from '@/scenes/Sign/RegisterStepper'
import EcSidebarMenu from '@/components/SidebarMenu'

import style from './Main.scss'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (<main>
      <Route path="/" exact component={EcSplash}/>
      <Route path="/seller-visitor" component={EcSellerVisitor}/>
      <Route path="/visitor" component={EcVisitor}/>
      <Route path="/app" component={EcSidebarMenu}/>
    </main>)
  }
}
