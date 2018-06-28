import React from 'react'
import {StyleSheet} from 'react-native'
import {View, Text} from 'react-native-animatable'


import ButtonRegister from '../../components/UI/Button'

const Opening = (props) => {
  return (
    <View style={styles.container}>
      <View animation={'zoomIn'} delay={3800} duration={400}>

        <ButtonRegister
          color='#3B5998'
          name="INICIAR CON FACEBOOK"
          onPress={() => props.onSignInPress()}/>

        <Text style={styles.separatorOr}>{' '}</Text>

        <ButtonRegister
            color='#5A8DFE'
            name="INGRESAR EMAIL"
            onPress={() => props.onSignInPress()}/>


      </View>

      <View style={styles.separatorContainer} animation={'zoomIn'} delay={4000} duration={400}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorOr}>{'Ó'}</Text>
        <View style={styles.separatorLine} />
      </View>

      <View animation={'zoomIn'} delay={4200} duration={400}>
        <ButtonRegister
          color='#1976d2'
          name="REGISTRATE"
          onPress={() => props.onCreateAccountPress()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    width : '70%',
    height : 100
  },

  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },

  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#FFFFFF'
  },

  separatorOr: {
    color: '#9B9FA4',
    marginHorizontal: 8
  },
});

export default Opening
