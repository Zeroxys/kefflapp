import React from 'react'
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {View} from 'react-native-animatable'

const PositionButton = (props) => {
  return (
      <View animation={props.expand ? 'fadeInRight' : 'fadeOutRight'} style={styles.buttonContent} onPress={props.OnPress}>
          <TouchableOpacity style={styles.iconContent}>
            <View>
              <Icon color= "#4285F4" size={28} name="md-locate"/>
            </View>
          </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  buttonContent : {
    position : 'absolute',
    bottom : '9%',
    right: '5%',
    backgroundColor: 'white',
    width : 50,
    height : 50,
    borderRadius : 100,
    elevation : 5,
    zIndex : 5,
  },

  iconContent : {
    top : 10,
    justifyContent : 'center',
    alignItems :'center'
  },
})


export default PositionButton