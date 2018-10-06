import React from 'react'
import {StyleSheet} from 'react-native'
import Map, {Marker} from 'react-native-maps'
import MapDirections from './MapDirections'
import trukImg from '../../assets/icon.png'

const MapView = props => {

  const trukerUbication = {
    latitude : 17.989456, 
    longitude : -92.947506,
  }

  let marker = null

  if(props.marker) {
    marker = <Marker pinColor={'#2A56C6'} coordinate={props.initialRegion}/>
  }

  // Truck marker

  console.warn(props.truckerInformation)

  return (
  <Map 
    showsCompass={false}
    style={styles.map}
    loadingIndicatorColor={'#2A56C6'}
    loadingBackgroundColor={'#2A56C6'}
    initialRegion={props.initialRegion}
    onPress={props.onPress}
    ref = {props.Ref}
    minZoomLevel={15}
    maxZoomLevel={18}>

    {marker} 
    <MapDirections currentLocation={props.initialRegion} truckerInformation={props.truckerInformation}/>
    <Marker pinColor={'#2A56C6'} coordinate={trukerUbication} image={trukImg} />
  </Map>  
  )
}

const styles = StyleSheet.create({
  map : {
    position : 'absolute',
    width : '100%',
    height : '100%'
  }
})

export default MapView
