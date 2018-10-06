import React from 'react'
import MapViewDirections from 'react-native-maps-directions'

const apikey = "AIzaSyAq9Rhbmb3PM6SL2XFzy61Xi1-92huuUwk"

const MapDirections = (props) => {

  console.warn(props)

  console.warn('MAPVIEW---->', props.truckerInformation)

  let trukerInformation = props.truckerInformation || ''

  const onError = (err) => {
    alert(err)
  }

  return (
    <MapViewDirections

      onError = {onError}
      strokeWidth={3}
      strokeColor="blue"
      origin={props.currentLocation}
      destination={trukerInformation}
      apikey={apikey}/>
  )
}

export default MapDirections