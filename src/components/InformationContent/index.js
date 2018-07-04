import React from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'

import Collapsible from 'react-native-collapsible'
import InfoContent from './InfoContent'

const InfoBox = (props) => {
  return (
    <View style={styles.infoContainers}>
      <Collapsible collapsed={props.expand} duration={500} style={styles.collapsible}>
        <InfoContent
          onPurchase = {props.onPurchase} 
          expand={props.expand}
          showTextInputPrice={props.showTextInputPrice} 
          showInputPrice={props.showInputPrice}/>
      </Collapsible>      
    </View>
  )
}

const styles = StyleSheet.create({

  infoContainers : {
    width : '100%',
  },

  collapsible : {
    width : '100%',
    justifyContent : 'center',
    alignItems : 'center',
    height: 230
  }
})

export default InfoBox
