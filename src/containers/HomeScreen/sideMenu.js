import react from 'react'
import {View, Text} from 'react-native'

export const sideMenu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native!
      </Text>
      <Text style={styles.instructions}>
        To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+Control+Z for dev menu
      </Text>
    </View>
  )
}
