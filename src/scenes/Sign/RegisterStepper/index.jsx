import React, {Component} from 'react'
import firebase from 'firebase'
import Stepper from 'react-stepper-horizontal'
import EcAddProducts from './components/AddProducts'
import EcEnterEmail from './components/EnterEmail'
import EcConfirm from './components/Confirm'
import {Container, Button, Dimmer, Loader} from 'semantic-ui-react'
import style from './RegisterStepper.scss'

export default class RegisterStepper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        active: false,
        email: '',
        profile: 2,
        products: [{
          name: '',
          description: '',
          pictures: [],
          pictureUrl: '',
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
      currentStep: 0,
      validationModalOpen: false,
      errorField: null,
      loader: {
        active: false,
        stepText: 'Subiendo imágenes'
      }
    }

    this.onClickNext = this.onClickNext.bind(this)
    this.handleUpdateRegisterData = this.handleUpdateRegisterData.bind(this)
  }

  componentWillMount() { }

  onClickNext() {
    const {currentStep, validationModalOpen} = this.state
    // this.setState({validationModalOpen: true})
    const validationResult = this.validateStep(currentStep)
    if (!validationResult.valid) {
      this.setState({ errorField: validationResult.field })
      return
    }

    if (currentStep === 1) {
      this.saveSellerVisitorUser()
    } else {
      this.setState({ currentStep: currentStep + 1 })
    }
  }


  async saveSellerVisitorUser() {
    const { loader, user, currentStep } = this.state

    // Muestra loader
    loader.active = true
    this.setState({loader})

    // Espera la subida de imagenes
    await this.uploadProductImages()

    loader.stepText = 'Guardando producto'
    this.setState({loader})

    const saveProductsResponse = await this.saveProducts()

    loader.stepText = 'Guardando usuario'
    this.setState({loader})

    // Agregar usuario seller a firebase
    const usersRef = firebase.database().ref().child('users')
    const userID = usersRef.push()
    await userID.set(this.formatUserData(user, saveProductsResponse.key))

    // Esconde loader
    loader.active = false
    this.setState({ currentStep: currentStep + 1, loader })
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
      if (i === 0) {
        // La primera imagen queda guardada en pictureUrl
        user.products[0].pictureUrl = response.metadata.downloadURLs[0]
      } else {
        // Las otras imagenes quedan guardadas en el aray
        user.products[0].pictures.push({ url: response.metadata.downloadURLs[0] })
      }
      that.setState({ user }, async () => response)
    }
  }

  async saveProducts() {
    // Agregar usuario seller a firebase
    const productsRef = firebase.database().ref().child('products')
    const productID = productsRef.push()
    productID.set(this.formatProductData(this.state.user.products[0]))
    return productID
  }

  formatProductData(data) {
    return {
      name: data.name,
      description: data.description,
      pictures: data.pictures,
      pictureUrl: data.pictureUrl
    }
  }

  formatUserData(userData, productKey) {
    let formattedData = {
      active: userData.active,
      email: userData.email,
      profile: userData.profile,
      products: {}
    }
    formattedData.products[productKey] =  true
    return formattedData
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

    this.setState({ user })
  }

  validateStep(stepNumber) {
    if (stepNumber === 0) {
      if (!this.state.user.products[0].name || this.state.user.products[0].name.length <= 2) {
        return {
          valid: false,
          field: 'name'
        }
      } else if (!this.state.user.products[0].description || this.state.user.products[0].description.length <= 9) {
        return {
          valid: false,
          field: 'description'
        }
      }
    } else if (stepNumber === 1) {
      if (!this.state.user.email || !this.validateEmail(this.state.user.email)) {
        return {
          valid: false,
          field: 'email'
        }
      }
    }

    return {
      valid: true,
      field: null
    }
  }

  validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email.toLowerCase())
  }

  render() {
    const {steps, currentStep} = this.state

    return (<div>
      <Container>
        <Dimmer active={this.state.loader.active}>
          <Loader content={this.state.loader.stepText} />
        </Dimmer>
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
        {this.state.currentStep === 0 && <EcAddProducts errorField={this.state.errorField} productsData={this.state.user.products} onUpdateProductsData={this.handleUpdateRegisterData}/>}
        {this.state.currentStep === 1 && <EcEnterEmail errorField={this.state.errorField} email={this.state.user.email} onUpdateEmail={this.handleUpdateRegisterData}/>}
        {this.state.currentStep === 2 && <EcConfirm/>}
        {this.state.currentStep < 2 && <Button onClick={this.onClickNext} className={`primary ${style.nextBtn}`} fluid>Siguiente</Button>}
      </Container>
    </div>)
  }
}
