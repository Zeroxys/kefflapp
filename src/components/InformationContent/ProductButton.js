import React from 'react'
import { Slider,StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Collapsible from 'react-native-collapsible'
import {View, Text} from 'react-native-animatable'

const Info = props => {

  let priceInput = null

  if(props.showInputPrice) {
    priceInput = (<View style={styles.messageInput} animation="fadeInRight">
        <TextInput
          keyboardType={'numeric'} 
          style={styles.input} 
          placeholder={props.placeholderInput}/>
      </View>)
  } else {
    priceInput = ( <View style={styles.messageInput} >
      <Text
        animation="fadeInRight">{props.messageInput}</Text>
      </View>
    )
  }

  return (
    <View style={styles.content}>

      <View style={styles.generalContent}>
        <View style={styles.container}>
          
          {/*Color y tipo de icono*/}
          <TouchableOpacity style={styles.iconContent}>
            <Icon name={props.iconName} size={22} color="#ffffff"/>
          </TouchableOpacity>

          {/*Introducimos la entrada*/}
          <View style={{width : 60, alignItems:'center'}}>
            {priceInput}
          </View>

          {/*Agregamos la cantidad que deseamos*/}
          <TouchableOpacity onPress={props.showTextInputPrice}>
            <Icon 
              name={props.showInputPrice ? "md-remove" : "md-add"} 
              size={22}/>
          </TouchableOpacity>

        </View>
        
        <Collapsible style={styles.collapsible} collapsed={true}>
          <TextInput underlineColorAndroid={"white"} style={styles.input} placeholder={props.messageInput}/>
        </Collapsible>
      </View>

    </View> 
  )
}

const styles = StyleSheet.create({

  collapsible : {
    justifyContent : 'center',
    alignItems : 'center'
  },

  input : {
    backgroundColor: "#FFFFFF",
    margin:0,
    padding: 0,
    width: '75%'
  },

  generalContent : {
    width : '100%',
    height : 50,
  },

  content : {
    width : '90%',
    height : 50,
    flexDirection:'row',
    margin: 5,
    flexDirection: 'row',
    justifyContent : 'space-between',
    backgroundColor : "#A5B7BD",
    elevation : 5,
  },

  container : {
    flex:1,
    flexDirection : 'row',
    justifyContent :'space-around',
    alignItems: 'center',
  },

  iconContent : {
    borderRadius: 100,
    width : 25,
    height : 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#4285F4'
  },

  messageInput:{
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    width : 180
  },

  inputPrice : {
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    textAlign : 'center',
  },

  input : {
    width : 130
  }
})

export default Info