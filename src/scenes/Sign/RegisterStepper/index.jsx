import React, {Component} from 'react'
import Stepper from 'react-stepper-horizontal'
import EcAddProducts from './components/AddProducts'
import EcEnterEmail from './components/EnterEmail'
import EcConfirm from './components/Confirm'
import {Container, Button} from 'semantic-ui-react'
import style from './RegisterStepper.scss'

export default class RegisterStepper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        products: [{
          name: '',
          description: '',
          images: [{}]
        }],
        email: ''
      },
      steps: [
        {
          title: 'Agrega producto'
        }, {
          title: 'Ingresa tus datos'
        }, {
          title: '¡Listo!'
        }
      ],
      currentStep: 0
    }

    this.onClickNext = this.onClickNext.bind(this)
    this.handleUpdateProductsData = this.handleUpdateProductsData.bind(this)
    this.handleUpdateEmail = this.handleUpdateEmail.bind(this)
  }

  onClickNext() {
    const {steps, currentStep} = this.state
    this.setState({
      currentStep: currentStep + 1
    }, () => {
      if (this.state.currentStep === 2) {
        console.log(this.state.user)
      }
    })
  }

  handleUpdateProductsData(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    const {user} = this.state
    // Por ahora sólo se agrega un producto
    user.products[0][name] = value
    this.setState({
      user
    })
  }

  handleUpdateEmail(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    const {user} = this.state
    user.email = value
    this.setState({
      user
    })
  }

  render() {
    const {steps, currentStep} = this.state

    return (<Container>
      <div className={style.stepper}>
        <Stepper
          activeColor="#8ad322"
          completeColor="#8ad322"
          defaultColor="#b8e873"
          completeBarColor="#525252"
          completeTitleColor="#525252"
          activeTitleColor="#525252"
          steps={steps} activeStep={currentStep}></Stepper>
      </div>
      {this.state.currentStep === 0 && <EcAddProducts productsData={this.state.user.products} onUpdateProductsData={this.handleUpdateProductsData}/>}
      {this.state.currentStep === 1 && <EcEnterEmail email={this.state.user.email} onUpdateEmail={this.handleUpdateEmail}/>}
      {this.state.currentStep === 2 && <EcConfirm/>}
      {this.state.currentStep < 2 && <Button onClick={this.onClickNext} className={`primary ${style.nextBtn}`} fluid>Siguiente</Button>}
    </Container>)
  }
}
