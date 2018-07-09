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
          placeholderInput = 'Cantidad'
          messageInput="Cantidad"

          showTextInputPrice={props.showTextInputPrice}           
          //showInputPrice={props.inputQuantity}
          showInputPrice={props.showInputPrice}          
          inputQuantity = {props.inputQuantity}
          onPurchase = {props.onPurchase}
          />

        <ProductButton
          name="Litros"
          iconName="ios-flame"
          showOptions = {props.showOptions}
          placeholderInput = 'Litros'
          messageInput="Litros"

          showTextInputPrice={props.showTextInputPrice}
          //showInputPrice={props.inputLiters}
          showInputPrice={props.showInputPrice}          
          inputLiters={props.inputLiters}
          />

        <ProductButton
          name="Kilos"
          iconName="md-flask"
          showOptions = {props.showOptions}
          placeholderInput = 'Kilos'
          messageInput="Kilos"

          showTextInputPrice={props.showTextInputPrice} 
          //showInputPrice = {props.inputKilos}
          showInputPrice={props.showInputPrice}          
          inputKilos = {props.inputKilos}
          />

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
