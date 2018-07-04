import React, {Component} from 'react'
import SideMenu from 'react-native-side-menu'
import Menu from './sideMenu.js'
import {Dimensions} from 'react-native'
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
      sideBarIsOpen : false,
      expand : true,
      marker : false,
      visible : false,
      showInputPrice : false
    }

    this.locationHandler = this.locationHandler.bind(this)
    this.onPurchase = this.onPurchase.bind(this)
  }
 
  onPurchase = () => {
    console.warn('item adquirido')
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


  showTextInputPrice = () => {
    this.setState( (prevState) => {
      return {
        showInputPrice : !prevState.showInputPrice
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

  componentDidMount () {
    this.getCurrentPosition()

    var params = this.getCurrentPosition()
  }

  render () {
    return (
      <SideMenu menu={Menu} isOpen={this.state.sideBarIsOpen}>
        <MapContent
          marker = {this.state.marker}
          initialRegion = {this.state.currentLocation}
          OnPress = {this.locationHandler}
          Ref = {ref => this.map = ref}
          toggle = {this.toggle}
          expand = {this.state.expand}
          onPurchase = {this.onPurchase}
          getCurrentPosition = {this.getCurrentPosition}
          showOptions = {this.showOptions}
          onSideBarOpen = {this._onSideBarOpen}

          showTextInputPrice = {this.showTextInputPrice}
          showInputPrice = {this.state.showInputPrice}/>
      </SideMenu>
    )
  }
}

export default HomeScreen