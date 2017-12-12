import React, {Component} from 'react'
import EcImportantMessage from '@/components/ImportantMessage'
import EcMap from '@/components/Map'
import EcRegisterButton from '@/components/Map/components/RegisterButton'

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
      <EcMap></EcMap>
      <EcRegisterButton></EcRegisterButton>
    </div>);
  }
}

SellerVisitor.propTypes = {};
