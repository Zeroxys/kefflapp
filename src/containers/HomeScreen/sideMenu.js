import React from 'react'
import {View,Text, StyleSheet, Image} from 'react-native'

const style = StyleSheet.create({
  content : {
    flex: 1,
    backgroundColor : '#eeeeee',
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
  },

  header : {
    width : '100%',
    height : '25%',
    flexDirection : 'row',
    display : 'flex',
    backgroundColor : '#757575',
    justifyContent : 'space-around',
    alignItems : 'center',
  },

  profileData : {
    marginRight : 30,
    justifyContent : 'center',
    display : 'flex',
    alignItems : 'center'
  },

  block : {
    height : '70%',
    width : 200,
    justifyContent : 'center',
    justifyContent : 'space-around',
  },

  mainContent : {
    flex: 1,
    display : 'flex',
    justifyContent : 'space-around',
    alignItems : 'center',
    flexDirection : 'column',
    display : 'flex',
  }
})


const Menu = <View style={style.content}>
        <View style={style.header}>
          <Image
            style={{width: 50, height: 50}}
            source={ { /*uri: this.state.facebookManager.picture.data.url */} }
          />
          <View style={style.profileData}>
            <Text style={{color : 'white'}}>
              Bienvenido
            </Text>
            <Text style={{color : 'white'}}>
              {/*this.state.facebookManager.name*/}
            </Text>
          </View>
        </View>
        <View style={style.mainContent}>
          <View style={style.block}>
            <Text>
              Ruta
            </Text>

            <Text>
              Configuración
            </Text>

            <Text>
              Ayuda
            </Text>

            <Text>
              Legal
            </Text>

            <Text>
              Cerrar Sesion
            </Text>
          </View>
        </View>
      </View>

module.exports = Menu      