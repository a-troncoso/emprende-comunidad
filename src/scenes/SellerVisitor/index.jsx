import React, {Component} from 'react'
import EcImportantMessage from '@/components/ImportantMessage'
import EcMap from '@/scenes/Map'

export default class SellerVisitor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showImportantMessage: true
    }

    this.handleRegister = this.handleRegister.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleRegister() {
    this.props.history.push('/register')
  }

  handleCancel() {
    this.setState({
      showImportantMessage: false
    })
  }

  render() {
    return (<div>
      {this.state.showImportantMessage && <EcImportantMessage onAccept={this.handleRegister} onCancel={this.handleCancel}></EcImportantMessage>}
      <EcMap ></EcMap>
    </div>);
  }
}

SellerVisitor.propTypes = {};
