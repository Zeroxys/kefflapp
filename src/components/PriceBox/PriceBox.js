import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
//import Modal from '../Modal/Modal'
//import Aux from '../HOC/Aux'

const PriceBox = () => {
  const info = () => {
    alert('Informacion Actualizada sobre el precio del gas')
  }

  return (
    <View style={styles.mainContent}>
      {/*Bar menu icon*/}
      <TouchableOpacity style={{height : 50}}>
        <Icon style={{marginRight: 300, top: 15}} color= "#424242" size={38} name="md-menu"/>
      </TouchableOpacity>
      
      <View>
        <TouchableOpacity style={styles.gasContent} onPress={info}>
          <Text style={styles.gasFont}>Gas LP al dia:  $10 kg</Text>
        </TouchableOpacity>
      </View>  
    </View>
  )
}

const styles = StyleSheet.create({
  mainContent : {
    justifyContent : 'center',
    alignItems : 'center'
  },

  gasContent : {
    marginTop : 15,
    width  : 220,
    padding : 10,
    backgroundColor: 'rgba(215,204,204,0.60)'
  },

  gasFont : {
    textAlign : 'center',
    color : 'black',
    fontSize : 15,
  }
})

export default PriceBox
