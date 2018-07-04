import React from 'react'
import {View, StyleSheet} from 'react-native'

//import info
import ProductButton from './ProductButton'
import SuccessButton from '../UI/SuccessButton'

const InfoContent = props => { 

  return (
    <View style={styles.generalContent}>
      <View>

        <ProductButton
          name="Cantidad"
          iconName="ios-flame"
          showOptions = {props.showOptions}
          placeholderInput = 'Introduce la cantidad'
          messageInput="Introduce la cantidad"
          showTextInputPrice={props.showTextInputPrice} 
          showInputPrice={props.showInputPrice}/>

        <ProductButton
          name="Litros"
          iconName="ios-flame"
          showOptions = {props.showOptions}
          placeholderInput = 'Introduce los litros'
          messageInput="Introduce los Litros"
          showTextInputPrice={props.showTextInputPrice} 
          showInputPrice={props.showInputPrice}/>

        <ProductButton
          name="Kilos"
          iconName="md-flask"
          showOptions = {props.showOptions}
          placeholderInput = 'Introduce lo kilos'
          messageInput="Introduce los Kilos"
          showTextInputPrice={props.showTextInputPrice} 
          showInputPrice={props.showInputPrice}/>

        </View>
      <SuccessButton onPurchase={props.onPurchase} title={'Comprar'}/>
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
