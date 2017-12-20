import React, {Component} from 'react'
import Stepper from 'react-stepper-horizontal'
import EcAddProducts from './components/AddProducts'
import EcEnterData from './components/EnterData'
import EcConfirm from './components/Confirm'
import {Container, Button} from 'semantic-ui-react'
import style from './RegisterStepper.scss'

export default class RegisterStepper extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

    this.onClickNext = this.onClickNext.bind(this);
  }

  onClickNext() {
    const {steps, currentStep} = this.state;
    this.setState({
      currentStep: currentStep + 1
    })
  }

  render() {
    const {steps, currentStep} = this.state;

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
      {this.state.currentStep === 0 && <EcAddProducts/>}
      {this.state.currentStep === 1 && <EcEnterData/>}
      {this.state.currentStep === 2 && <EcConfirm/>}
      {this.state.currentStep < 2 && <Button onClick={this.onClickNext} className={`primary ${style.nextBtn}`} fluid>Siguiente</Button>}
    </Container>)
  }
}
