import React from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {View} from 'react-native-animatable'

const PositionButton = props => {
  //console.warn(props.onPress)
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.buttonContent}>
      <View
        style={styles.iconContent}
        animation={props.expand ? 'fadeInRight' : 'fadeOutRight'} >
          <Icon color= "#4285F4" size={28} name="md-locate"/>
      </View>
    </TouchableOpacity>  
  )
}

const styles = StyleSheet.create({
  buttonContent : {
    position : 'absolute',
    bottom : '9%',
    right: '5%',
    //backgroundColor: 'white',
    width : 50,
    height : 50,
    borderRadius : 100,
    //elevation : 5,
    //Index : 5,
  },

  iconContent : {
    top : 10,
    justifyContent : 'center',
    alignItems :'center'
  },
})


export default PositionButton