import React, {Component} from 'react'
import firebase from 'firebase'
import Stepper from 'react-stepper-horizontal'
import EcAddProducts from './components/AddProducts'
import EcEnterEmail from './components/EnterEmail'
import EcConfirm from './components/Confirm'
import {Container, Button} from 'semantic-ui-react'
import style from './RegisterStepper.scss'
import defaultImagePic from '@/assets/images/default-image.png'

export default class RegisterStepper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        id: Math.floor(Math.random() * 1000) + 1,
        active: false,
        email: '',
        profile: 2,
        products: [{
          name: '',
          description: '',
          pictures: [defaultImagePic]
        }]
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
    this.handleUpdateRegisterData = this.handleUpdateRegisterData.bind(this)
  }

  onClickNext() {
    const {steps, currentStep} = this.state
    this.setState({
      currentStep: currentStep + 1
    }, () => this.checkCurrentStep())
  }

  checkCurrentStep() {
    if (this.state.currentStep === 2) {
      this.saveSellerVisitorUser()
    }
  }

  saveSellerVisitorUser() {
    let {user} = this.state

    // Quita la primera imagagen correspondientes a la default imagen pic
    user.products[0].pictures = user.products[0].pictures.filter((pic, idx) => {return idx > 0})

    console.log(user)

    //Agregar usuario seller a firebase
    const usersRef = firebase.database().ref().child('users')
    const userID = usersRef.push()
    userID.set(user)
  }

  handleUpdateRegisterData(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    const {user} = this.state

    // Por ahora sólo se agrega un producto
    // por si es imagen lo q se sta agregando
    if (name === 'pictures') {
      user.products[0].pictures = user.products[0].pictures.concat(value)
    } else if (name === 'email') {
      user.email = value
    } else {
      user.products[0][name] = value
    }

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
      {this.state.currentStep === 0 && <EcAddProducts productsData={this.state.user.products} onUpdateProductsData={this.handleUpdateRegisterData}/>}
      {this.state.currentStep === 1 && <EcEnterEmail email={this.state.user.email} onUpdateEmail={this.handleUpdateRegisterData}/>}
      {this.state.currentStep === 2 && <EcConfirm/>}
      {this.state.currentStep < 2 && <Button onClick={this.onClickNext} className={`primary ${style.nextBtn}`} fluid>Siguiente</Button>}
    </Container>)
  }
}
