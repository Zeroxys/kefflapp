import React, {Component} from 'react';
import {} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {LoginManager, AccessToken} from 'react-native-fbsdk'

import AuthScreen from './containers/AuthScreen/index'
import HomeScreen from './containers/HomeScreen/index'

class App extends Component {

  constructor () {
    super()
    this.state = {
      isLoggedIn : false,
      isLoading : false,
      isAppReady : false     
    }

    this._facebookLoginManager = this._facebookLoginManager.bind(this)
  }

  /*state = {
    isLoggedIn : false,
    isLoading : false,
    isAppReady : false
  }*/

  // Make the facebook Login..
  _facebookLoginManager = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then( res => {
        if(res) {          
          
          this.setState( prevState => {
            return {
              isAppReady : prevState.isAppReady = true
            }
          })
        }else {
          alert('login cancelled')
        }
      }
    ).catch( (err) => {
      this.setState( prevState => {
        return {
          isAppReady : prevState.isAppReady = true
        }
      })
    })
  }


  //Simulate what the user is Login
  _Login = (username, password) => {
    this.setState( prevState => {
      return {
        isLoading : !prevState.isLoading
      }
    })

    setTimeout( () => {
      this.setState( prevState => {

        return {
          isLoading : prevState.isLoading = false,
          isLoggedIn : prevState.isLoggedIn = true
        }
      })
    }, 2500)
  }

  //Simulate what the user is SignUp
  _SignUp = (username, password, fullName) => {
    
    this.setState( (prevState) => {
      isLoading : this.prevState.isLoading = true
    })

    setTimeout( () => {
      this.setState( (prevState) => {
        isLoading : this.prevState.isLoading = false
        isLoggedIn : this.prevState.isLoggedIn = true
      })
    }, 1000)

  }

  componentDidMount () {
    setTimeout( () => {
      SplashScreen.hide()
    },2500)
  }

  render() {

    let Screen = null

    if(this.state.isAppReady) {
      Screen = <HomeScreen/>
    } else {
      Screen = <AuthScreen
                  facebookLoginManager={this._facebookLoginManager}
                  Login={this._Login}
                  Signup={this._SignUp}
                  isLoggedIn={this.state.isLoggedIn}
                  isLoading={this.state.isLoading}
                  isAppReady={this.state.isAppReady}
                  onLoginAnimationCompleted={() => this.setState({isAppReady : true})}/> 
    }

    return Screen
  }
}


export default App
