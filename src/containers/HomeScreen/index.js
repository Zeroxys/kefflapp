import React, {Component} from 'react'
import SideMenu from 'react-native-side-menu'
import Menu from './sideMenu.js'
import {Dimensions} from 'react-native'

import MapContent from '../../components/Map/MapContent'

const {width, height} = Dimensions.get('window')

class HomeScreen extends Component {
  state = {
    currentLocation : {
      latitude : 17.989456,
      longitude : -92.947506,
      latitudeDelta : 0.0122,
      longitudeDelta : width / height * 0.0122
    },
    expand : true,
    marker : false,
    visible : false,
    showInputPrice : false
  }
 
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
  }

  render () {
    return (
      <SideMenu menu={Menu}>
        <MapContent
          marker = {this.state.marker}
          initialRegion = {this.state.currentLocation}
          OnPress = {this.locationHandler}
          Ref = {ref => this.map = ref}
          toggle = {this.toggle}
          expand = {this.state.expand}
          openModal = {this.openModal}
          getCurrentPosition = {this.getCurrentPosition}
          showOptions = {this.showOptions}

          showTextInputPrice = {this.showTextInputPrice}
          showInputPrice = {this.state.showInputPrice}/>
      </SideMenu>
    )
  }
}

export default HomeScreen