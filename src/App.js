import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {LoginManager, AccessToken} from 'react-native-fbsdk'
import OneSignal from 'react-native-onesignal'
import axios from 'axios'

import AuthScreen from './containers/AuthScreen/index'
import HomeScreen from './containers/HomeScreen/index'

class App extends Component {

  constructor () {
    super()
    this.state = {
      openSideBar :  false,
      isLoggedIn : false,
      isLoading : false,
      isAppReady : false,
      facebookManager : null     
    }

    this._isOpenSideBar = this._isOpenSideBar.bind(this)
    this._facebookLoginManager = this._facebookLoginManager.bind(this)
  }


  _saveProfile = async (res) => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(res.data))
    }catch (error) {
      console.warn('error' + error)
    }
  }

  _isOpenSideBar = () => {
    this.setState(prevState => {
      return {
        openSideBar : !prevState.openSideBar 
      }
    })
  }

  // Make the facebook Login..
  _facebookLoginManager = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then( res => {
        if(res) {          
          AccessToken.getCurrentAccessToken().then( res => {
            axios.get(`https://graph.facebook.com/v3.0/me?fields=id,name,picture&access_token=${res.accessToken}`).then( res => {
            
              this._saveProfile(res)
              this.setState(prevState => {
                return {
                  facebookManager : prevState.facebookManager = {...res.data},
                  isLoggedIn : prevState.isLoggedIn = true
                } 
              })
                                 
            }).catch (err => {
              this.setState( prevState => {
                return {
                  isLoggedIn : prevState.isLoggedIn = false
                }
              })
            })


          }).catch( err => {
            alert('error al generar el token')
            this.setState( prevState => {
              return {
                isLoggedIn : prevState.isLoggedIn = false
              }
            })
          })
        }else {
          alert('login cancelled')
          this.setState( prevState => {
            return {
              isLoggedIn : prevState.isLoggedIn = false
            }
          })
        }
      }
    ).catch( err => {
      if(err) {
        this.setState( prevState => {
          return {
            isLoggedIn : prevState.isLoggedIn = false
          }
        })
      }
    })
  }


  //Simulate what the user is Login
  _Login = (value) => {
    if(value) {
      this.setState( prevState => {
        return {
          isLoading : !prevState.isLoading
        }
      })
      axios.post('http://159.65.186.61:8001/api/v1/customer/login', {
        ...value
      })
      .then( res => {
        if(res){
          this.setState( prevState => {

            return {
              isLoading : prevState.isLoading = false,
              isLoggedIn : prevState.isLoggedIn = true
            }
          })
        }
      })
      .catch( error => {        
        if(error){
          this.setState( prevState => {
            return {
              isLoading : prevState.isLoading = false
            }
          })

          alert('El correo electronico no existe')
        }
      })
    }

  }

  //Simulate what the user is SignUp
  _SignUp = (value) => {

    if(value) {
      this.setState( prevState => {
        return {
          isLoading : !prevState.isLoading
        }
      })
      axios.post('http://159.65.186.61:8001/api/v1/customer', {
        ...value
      })
      .then( res => {
        if(res){
          this.setState( prevState => {

            return {
              isLoading : prevState.isLoading = false,
            }
          })
        }
        alert('Usuario Registrado con exito')
      })
      .catch( error => {        
        if(error){
          this.setState( prevState => {
            return {
              isLoading : prevState.isLoading = false
            }
          })

          alert('Error en el servidor')
        }
      })
    }

  }

  componentWillMount() {
    OneSignal.init("f2334502-2b91-4bdd-bcee-5a948515c958");

    //OneSignal.addEventListener('received', this.onReceived);
    //OneSignal.addEventListener('opened', this.onOpened);
    //OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    //OneSignal.removeEventListener('received', this.onReceived);
    //OneSignal.removeEventListener('opened', this.onOpened);
    //OneSignal.removeEventListener('ids', this.onIds);
}

onReceived(notification) {
  console.log("Notification received: ", notification);
}

/*onOpened(openResult) {
console.log('Message: ', openResult.notification.payload.body);
console.log('Data: ', openResult.notification.payload.additionalData);
console.log('isActive: ', openResult.notification.isAppInFochttp://www.actitudfem.com/us);
console.log('openResult: ', openResult);
}

onIds(device) {
console.log('Device info: ', device);
}*/

  componentDidMount () {
    setTimeout( () => {
      SplashScreen.hide()
    },2500)
  }

  render() {

    let Screen = null

    if(this.state.isAppReady) {
      Screen = <HomeScreen
                  openSidebar={this._isOpenSideBar}
                />
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
