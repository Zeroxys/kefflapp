import React, {Component} from 'react'
import SideMenu from 'react-native-side-menu'
import {Dimensions, StyleSheet, View, Text, Image, AsyncStorage} from 'react-native'
import OpenSocket from 'socket.io-client'

import MapContent from '../../components/Map/MapContent'

const {width, height} = Dimensions.get('window')
const socket = OpenSocket('http://159.65.186.61:8001')

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentLocation : {
        latitude : 17.989456,
        longitude : -92.947506,
        latitudeDelta : 0.0122,
        longitudeDelta : width / height * 0.0122
      },

      userName : null,
      userPicture : null,
      sideBarIsOpen : false,
      expand : true,
      marker : false,
      visible : false,

      showInputPrice : false, // <--- Muestra las tablas de input
      inputQuantity : '',
      inputLiters : false,
      inputKilos : false,
    }

    this.locationHandler = this.locationHandler.bind(this)
    this.onPurchase = this.onPurchase.bind(this)
  }
 
  onPurchase = () => {
    console.warn(this.state.inputQuantity)
    this.setState( prevState => {
      return {
        inputQuantity : prevState.inputQuantity = ''
      }
    })
  }

  // watcher que vigilara la posicion actual
  // y cambiara el marker
  /*_getWatchPosition = () => {
    let watchId = navigator.geolocation.watchPosition( pos => {
      let lat = pos.coords.latitude
      let long = pos.coords.longitude

      let lastRegion = {
        nativeEvent : {
          coordinate : {
            latitude : pos.coords.latitude,
            longitude :  pos.coords.longitude
          }
        }
      }
      this.locationHandler(lastRegion)      
    })
  }*/

  showTextInputPrice = (e) => {
    //console.warn(e)
    //console.warn('pushpush')
    this.setState( (prevState) => {
      return {
        //showInputPrice : !prevState.showInputPrice
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
      if(error_handler) alert('get current position failed')
    })
    //this._getWatchPosition()
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
      let mailUser = JSON.parse(await AsyncStorage.getItem('user_token'))

      //console.warn(mailUser)

      if( fbUser) {
        this.setState(prevState => {
          return {
            userName : prevState.userManager = fbUser.name,
            userPicture : prevState.userPicture = fbUser.picture.data.url
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

  componentDidMount () {
    this.getCurrentPosition()
    this.getUserLogin()

    socket.on('connection')
    socket.emit('createOrder', {
      lat: '17.99740963',
      lng: '-92.9406558',
      quantity: '40',
      idProducto: '5b3bfb3eaec2945dc9d17a90',
      idCostumer: '5b440136aec2945dc9d17a92',
    } )
  } 

  render () {
    const Menu = (<View style={style.content}>
                  <View style={style.header}>
                    <Image
                      style={{width: 50, height: 50}}
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