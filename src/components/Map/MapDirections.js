import React from 'react'
import MapViewDirections from 'react-native-maps-directions'

const apikey = "AIzaSyAq9Rhbmb3PM6SL2XFzy61Xi1-92huuUwk"

const trukerUbication = {
  latitude : 17.989456, 
  longitude : -92.947506,
}

const MapDirections = (props) => {

  const onError = (err) => {
    alert('Error al traer la ubicacion del chofer')
  }

  return (
    <MapViewDirections
      onError = {onError}
      strokeWidth={3}
      strokeColor="blue"
      origin={props.currentLocation}
      destination={trukerUbication}
      apikey={apikey}/>
  )
}

export default MapDirections