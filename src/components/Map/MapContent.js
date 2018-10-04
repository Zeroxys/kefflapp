import React from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'

import MapView from './MapView'
import PositionButton from '../PositionButton/PositionButton'
import ArrowButton from '../ArrowButton/ArrowButton'
import PriceBox from '../PriceBox/PriceBox'

const MapContent = props => {

  return (
    <View style={styles.mapContent}>
      <MapView
        //Seller information
        truckerInformation={props.truckerInformation}

        marker = {props.marker}
        initialRegion={props.initialRegion}
        onPress={props.OnPress}
        Ref = {props.Ref}/>
      <PriceBox onSideBarOpen={props.onSideBarOpen}/>
      <PositionButton onPress={props.getCurrentPosition} expand={props.expand}/>
      <ArrowButton 
        onPurchase={props.onPurchase}
        expand={props.expand}
        OnPress={props.toggle} 
        Icon={props.expand}
        showTextInputPrice={props.showTextInputPrice} 
        showInputPrice={props.showInputPrice}
        
        inputQuantity = {props.inputQuantity}
        inputLiters = {props.inputLiters}
        inputKilos = {props.inputKilos}
        />
    </View>)
}

const styles = StyleSheet.create({
  mapContent : {
    width : '100%',
    minHeight : '100%',
    maxHeight : '100%',
    alignItems :'center',
  }
})

export default MapContent