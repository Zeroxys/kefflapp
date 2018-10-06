import React, {Component} from 'react'
import SideMenu from 'react-native-side-menu'
import {Dimensions, StyleSheet, View, Text, Image, AsyncStorage} from 'react-native'
import OpenSocket from 'socket.io-client'
import axios from 'axios'
import Geocoder from 'react-native-geocoder';

Geocoder.fallbackToGoogle('AIzaSyAw396k4T2psyghFf2PPI0FZn8P9jEYVLU');

import MapContent from '../../components/Map/MapContent'

import Modal from '../../components/Modal/Modal'

const {width, height} = Dimensions.get('window')
const socket = OpenSocket('http://178.128.70.168:8001')

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {

      customerItem : {},

      products : null,

      currentLocation : {
        latitude : 17.989456,
        longitude : -92.947506,
        latitudeDelta : 0.0122,
        longitudeDelta : width / height * 0.0122
      },

      userName : null,
      userPicture : null,
      userId : null,

      sideBarIsOpen : false,
      expand : true,
      marker : false,
      visible : false,

      showInputPrice : false, // <--- Muestra las tablas de input
      inputQuantity : '',
      inputLiters : false,
      inputKilos : false,
      modal: false,

      truckerInformation : ''
    }

    this.locationHandler = this.locationHandler.bind(this)
    this.onPurchase = this.onPurchase.bind(this)
  }

  onPurchase = () => {
    
    //console.warn('------ id producto ------>',this.state.products[1]._id)

    //console.warn('ID DE USUARIO --->', this.state.userId)

    let data = {
      lat: this.state.currentLocation.latitude,
      lng: this.state.currentLocation.longitude,
      quantity: this.state.inputQuantity,
      idProducto: this.state.products[1]._id,
      idCostumer: this.state.userId,
    }

    //console.warn(data)

    socket.on('coordinates', (coordinates) => {
      
      let _self = this

      let coordinatesSeller = {
        latitude : coordinates.lat,
        longitude : coordinates.lng
      }

      this.setState(prevState => {
        return {
          truckerInformation : prevState.truckerInformation = coordinatesSeller
        }
      })

      console.warn('COORDENADAS DEL VENDEDOR---->', coordinatesSeller)
      console.warn('VENDEDOR STATE ----->', this.state.truckerInformation)
      
    })

    socket.emit('createOrder', data, (respuesta) => {
      
      //let _self = this

      console.warn('Respuesta de mi orden creada ----->', respuesta)


      Geocoder.geocodeAddress(respuesta[0].destination).then(res => {
          console.warn('GEOCODER---->', res[0].position)
          //return res[0].formattedAddress
          /*_self.setState(prevState => {
            return {
              truckerInformation : prevState.truckerInformation = res[0].position
            }
          })*/
      })
      .catch(err => console.log(err))

      if(respuesta[0].seller === 0) {
        console.warn('No se encontraron vendedores')
      } else {
        //console.warn('Join que envio desde costumer ', respuesta)
        respuesta[1].costumer = true
      
        socket.emit('join', respuesta, function (err) {

          if(err) {
            alert(err)
          } else {

            /*_self.setState(prevState => {
              return {
                truckerInformation : prevState.truckerInformation = sellerAddress
              }
            })*/

            //console.warn('Se ha agregado un vendedor '+ respuesta[0].id)
          }
        })
      }

    })

  }

  // watcher que vigilara la posicion actual
  // y cambiara el marker
  /*_getWatchPosition = () => {
    this.watchId = navigator.geolocation.watchPosition( (pos) => {
      let lastRegion = {
        nativeEvent : {
          coordinate : {
            latitude : pos.coords.latitude,
            longitude :  pos.coords.longitude
          }
        }
      }
      this.locationHandler(lastRegion)      
    },(error) => null,
    { enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 10 })

    console.warn(this.watchId)

  }*/

  showTextInputPrice = (e) => {
    this.setState( (prevState) => {
      return {
        inputQuantity : prevState.inputQuantity = e.replace(/[^0-9]/g,'')
      }
    })
  }


  toggle = () => {
    this.setState( prevState => {
      return {
        expand : !prevState.expand
      }
    })

  }

  _onSideBarOpen = () => {
    this.setState( prevState => {
      return {
        sideBarIsOpen : !prevState.sideBarIsOpen
      }
    })
  }

  getCurrentPosition = (event) => {
    navigator.geolocation.getCurrentPosition( pos => {
      
      const coordsEvent = {
        nativeEvent : {
          coordinate : {
            latitude : pos.coords.latitude,
            longitude :  pos.coords.longitude
          }
        }
      }
      this.locationHandler(coordsEvent)
    }, error_handler => {
      if(error_handler) alert('Fallo el obtener tu posicion, asegurate de tener el gps activado')
    })
  }

  locationHandler = event => {
    let coords = event.nativeEvent.coordinate

    this.map.animateToRegion({
      ...this.state.currentLocation,
      latitude :  coords.latitude,
      longitude : coords.longitude
    })

    this.setState(prevState => {
      return {
        currentLocation : {
          ...prevState.currentLocation,
          latitude : coords.latitude,
          longitude : coords.longitude
        },
        marker : true
      }
    })
  }

  async getUserLogin () {
    try {
      let fbUser  = JSON.parse(await AsyncStorage.getItem('fb_token'))
      let fbUserId  = JSON.parse(await AsyncStorage.getItem('fb_userId'))
      let mailUser = JSON.parse(await AsyncStorage.getItem('user_token'))

      //console.warn('usuario de fb ---->',fbUser)
      //console.warn('id que viene de LA API ----->', fbUserId.loginResult._id)

      if( fbUser) {
        this.setState(prevState => {
          return {
            userName : prevState.userManager = fbUser.name,
            userPicture : prevState.userPicture = fbUser.picture.data.url,
            userId : prevState.userId = fbUserId.loginResult._id
          }
        })
      }if(mailUser){
        this.setState(prevState => {
          return {
            userName : prevState.userManager = mailUser.data.loginResult.name,
            userPicture : prevState.userPicture = 'http://clipground.com/images/profile-clipart-2.png'
          }
        })
      }
    } catch (error) {
      console.warn(error)
    } 
  }

  getProductIds = () => {
    axios.get('http://178.128.70.168:8001/api/v1/products').then(res => {
      let result = res.data.data.result
      this.setState(prevState => {
        return {
          products : prevState.products = [...result]
        }
      })
    }).catch(err => { 
      console.warn(err)
    })
  }

  componentDidMount () {
    this.getProductIds()
    this.getCurrentPosition()
    this.getUserLogin()
    //this._getWatchPosition()

    socket.on('connection')

  } 

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  closeModal = (event) => {
    //console.warn('close...!!!')
    this.setState( (prevState) => {
      return {
        modal : prevState.modal = false
      }
    })
  } 

  render () {

    const Menu = (<View style={style.content}>
                  <View style={style.header}>
                    <Image
                      style={{width: 90, height: 90}}
                      source={ { uri: this.state.userPicture  } }
                    />
                    <View style={style.profileData}>
                      <Text style={{color : 'white'}}>
                        Bienvenido
                      </Text>
                      <Text style={{color : 'white'}}>
                        {this.state.userName}
                      </Text>
                    </View>
                  </View>
                  <View style={style.mainContent}>
                    <View style={style.block}>
                      <Text>
                        Perfil
                      </Text>

                      <Text>
                        Mis Pedidos
                      </Text>

                      <Text>
                        Pago
                      </Text>

                      <Text>
                        Factura
                      </Text>

                      <Text>
                        Acerca de la Aplicación
                      </Text>

                      <Text>
                        Configuración
                      </Text>

                      <Text>
                        Ayuda
                      </Text>

                      <Text>
                        Legal
                      </Text>
                    </View>
                  </View>
                  </View>)


    return (
      <SideMenu 
        menu={Menu} 
        isOpen={this.state.sideBarIsOpen}
        autoClosing={false}
        disableGestures={true}
        onChange={() => {
          this.setState(prevState => {
            return {
              sideBarIsOpen : prevState.sideBarIsOpen = false
            }
          })
        }}>
 
        <Modal closeModal={this.closeModal} visible={this.state.modal}/>

        <MapContent
          marker = {this.state.marker}
          initialRegion = {this.state.currentLocation}
          OnPress = {this.locationHandler}
          Ref = {ref => this.map = ref}
          toggle = {this.toggle}
          expand = {this.state.expand}
          onPurchase = {this.onPurchase}
          getCurrentPosition={this.getCurrentPosition}
          showOptions = {this.showOptions}
          onSideBarOpen = {this._onSideBarOpen}

          showTextInputPrice = {this.showTextInputPrice}
          showInputPrice = {this.state.showInputPrice}
          
          inputQuantity = {this.state.inputQuantity}
          inputLiters = {this.state.inputLiters}
          inputKilos = {this.state.inputKilos}

          // Seller information
          truckerInformation={this.state.truckerInformation}
          />
      </SideMenu>
    )
  }
}

const style = StyleSheet.create({
  content : {
    flex: 1,
    backgroundColor : '#eeeeee',
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
  },

  header : {
    width : '100%',
    height : '25%',
    flexDirection : 'row',
    display : 'flex',
    backgroundColor : '#757575',
    justifyContent : 'space-around',
    alignItems : 'center',
  },

  profileData : {
    marginRight : 30,
    justifyContent : 'center',
    display : 'flex',
    alignItems : 'center'
  },

  block : {
    height : '70%',
    width : 200,
    justifyContent : 'center',
    justifyContent : 'space-around',
  },

  mainContent : {
    flex: 1,
    display : 'flex',
    justifyContent : 'space-around',
    alignItems : 'center',
    flexDirection : 'column',
    display : 'flex',
  }
})

export default HomeScreen