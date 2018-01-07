import React, {Component} from 'react'
import firebase from 'firebase'
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
        id: Math.floor(Math.random() * 1000) + 1,
        active: false,
        email: '',
        profile: 2,
        products: [{
          name: '',
          description: '',
          pictures: [],
          image: '',
          temporaryPictures: []
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

  async saveSellerVisitorUser() {
    await this.uploadProductImages()
    // Si se han subido todas las imágenes del producto
    if (this.state.user.products[0].temporaryPictures.length < this.state.user.products[0].pictures.length) { return }

    let {user} = this.state

    // Agregar usuario seller a firebase
    const usersRef = firebase.database().ref().child('users')
    const userID = usersRef.push()
    userID.set(this.formatUserData(user))
  }

  async uploadProductImages() {
    let extension = '', fileName = '', storageRef = {}, productImagesRef = {}, currentFile
    const that = this, {user} = this.state

    for (var i = 0; i < this.state.user.products[0].temporaryPictures.length; i++) {
      currentFile = this.state.user.products[0].temporaryPictures[i].file
      extension = currentFile.type.split('/')[1]
      fileName = `${currentFile.lastModified}.${extension}`
      storageRef = firebase.storage().ref()
      productImagesRef = storageRef.child('productImages').child(fileName)

      // Espera la respuesta de la subida de la imagen
      let response = await productImagesRef.put(currentFile)
      user.products[0].pictures.push({
        url: response.metadata.downloadURLs[0]
      })
      that.setState({ user }, async () => response)
    }
  }

  formatUserData(data) {
    return {
        id: this.state.user.id,
        active: this.state.user.active,
        email: this.state.user.email,
        profile: this.state.user.profile,
        products: [{
          name: this.state.user.products[0].name,
          description: this.state.user.products[0].description,
          image: this.state.user.products[0].pictures[0].url, // La 1era imagen
          pictures: this.state.user.products[0].pictures.slice(1) // desde la 2da imagen
        }]
    }
  }

  handleUpdateRegisterData(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    const {user} = this.state

    // Por ahora sólo se agrega un producto
    // por si es imagen lo q se sta agregando
    if (name === 'pictures') {
      user.products[0].temporaryPictures = user.products[0].temporaryPictures.concat({
        base64: value,
        file: target.file
      })
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
