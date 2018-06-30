import React, {Component} from 'react'
import {View,Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Collapsible from 'react-native-collapsible'

//import info
import ProductButton from './ProductButton'
import SuccessButton from '../UI/SuccessButton'

const {width, height} = Dimensions.get('window')

const InfoContent = props => {
  

  return (
    <View style={styles.generalContent}>
      <View>

        <ProductButton
          name="Cantidad"
          iconName="ios-flame"
          showOptions = {props.showOptions}
          messageInput="Introduce la cantidad"
          showTextInputPrice={props.showTextInputPrice} 
          showInputPrice={props.showInputPrice}/>

        <ProductButton
          name="Litros"
          iconName="ios-flame"
          showOptions = {props.showOptions}
          messageInput="Introduce los Litros"
          showTextInputPrice={props.showTextInputPrice} 
          showInputPrice={props.showInputPrice}/>

        <ProductButton
          name="Kilos"
          iconName="md-flask"
          showOptions = {props.showOptions}
          messageInput="Introduce los Kilos"
          showTextInputPrice={props.showTextInputPrice} 
          showInputPrice={props.showInputPrice}/>

        </View>
      <SuccessButton title={'Comprar'}/>
    </View>
  )
}

const styles = StyleSheet.create({

  generalContent : {
    position : 'absolute',
    justifyContent : 'center',
    alignItems : 'center',
  }
})

export default InfoContent
