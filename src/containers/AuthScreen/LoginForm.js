import React, {Component} from 'react'
import {StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import {View, Text} from 'react-native-animatable'
import t from 'tcomb-form-native'
import axios from 'axios'

import {LoginUser, formStyles, options} from '../../utils/LoginModel'
import ButtonRegister from '../../components/UI/Button'

const {width} = Dimensions.get('window')
const Form = t.form.Form

class LoginForm extends Component { 

  constructor(props) {
    super(props)
  }

  _onPress = ()  => {
    var value = this.refs.form.getValue()
    if (value) {
      axios.post('http://159.65.186.61:8001/api/v1/customer/login', {
        ...value
      })
      .then(function (response) {
        console.warn(response);
      })
      .catch(function (error) {
        console.warn(error);
      })
    }
  }

  render () {

    let state = this.props.isLoading

    return(<View
        animation={'fadeInUp'}
        duration={1200}
        delay={0}
        style={styles.container}>

          <Form
            ref="form"
            type={LoginUser}
            options={options}/>
            
            <ButtonRegister
              color='#5A8DFE'
              name="INICIAR SESIÓN"
              onPress={this._onPress}
              Login={this.props.Login}
              isLoading={this.props.isLoading}/>

            <TouchableOpacity onPress={() => this.props.onLinkPress()}>
              <Text 
                style={styles.link}>{'Aun no estas registrado ? '}</Text>
            </TouchableOpacity>
      </View>)
  }
}
const styles = StyleSheet.create({
  container : {
    flex:1,
    borderRadius : 3,
    width : width * 0.8,
  },
  link: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})

export default LoginForm
