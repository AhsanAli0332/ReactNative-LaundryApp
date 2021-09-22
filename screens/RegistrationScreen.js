import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  ActivityIndicator
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class RegistrationScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      controls: {
        userName: {
            value: "",
            valid: false,
            validationRules: {
                minLength: 3
            }
        },
        mobileNumber: {
            value: "",
            valid: false,
            validationRules: {
                minLength: 11
            }
        },
        email: {
            value: "",
            valid: false,
            validationRules: {
                isEmail: true
            }
        },
        postalAddress: {
            value: "",
            valid: false,
            validationRules: {
                maxLength: 12
            }
        },
        password: {
            value: "",
            valid: false,
            validationRules: {
                minLength: 6
            }
        },
        confirmPassword: {
            value: "",
            valid: false,
            validationRules: {
                equalTo: 'password'
            }
        }
      },
      // userName: '',
      // mobileNumber:'',
      // email: '', 
      // postalAddress: '',
      // password: '',
      isLoading: false,
    }
  }

  handleUpdateInput = (value, key) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
              ...prevState.controls[key],
              value: value,
              valid: this.validateInput(value, key)
          }
        }
      }
    })
  }

  validateInput(value, key) {
    let isValid = false;
    switch (key) {
        case 'email':
            isValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value);
            break;
        case 'password':
            isValid = value.length >= 6;
            break;
        case 'userName':
            isValid = value.length >= 3;
            break;
        case 'mobileNumber':
            isValid= /03[0-9]{2}([0-9])(?!\1{6})[0-9]{6}/.test(value);
            break;
        case 'postalAddress':
            isValid = value.length >= 12;
            break;
        case 'confirmPassword':
            isValid = (value === this.state.controls.password.value);
            break;

        default:
            isValid = false;
    }
    return isValid;
  }

  // updateInputVal = (val, prop) => {
  //   const state = this.state;
  //   state[prop] = val;
  //   this.setState(state);
  // }

  registerUser = () => {
    const { userName, mobileNumber, email, postalAddress, password, confirmPassword } = this.state.controls;
    console.log(this.state.controls);

    if(email.valid) {
      if (password.valid) {
        if (confirmPassword.valid) {
          if (userName.valid) {
            if (mobileNumber.valid) {
              if (postalAddress.valid) {
                this.setState({
                  isLoading: true,
                })
                auth()
                .createUserWithEmailAndPassword(email.value.trim(), password.value)
                .then((res) => {
                  // res.user.updateProfile({
                  //   userName: this.state.userName
                  // })
                  // if(this.state.name === ''){
                  //   alert('Fill at least your name!')
                  // } else {
                    firestore().collection('clients').doc(res.user.uid).set({
                      userName: this.state.controls.userName.value,
                      email: this.state.controls.email.value,
                      mobileNumber: this.state.controls.mobileNumber.value,
                      password: this.state.controls.password.value,
                      postalAddress: this.state.controls.postalAddress.value,
                    }).then((res) => {
                      console.log("3");
                      this.setState({
                        // userName: '',
                        // email: '',
                        // mobileNumber: '',
                        // password: '',
                        // postalAddress: '',
                        isLoading: false,
                      });
                      // this.props.navigation.navigate('Registration')
                    })
                    .catch((err) => {
                      console.error("Error found: ", err);
                      Alert.alert(err.message)
                    });
                  // };
                  Alert.alert('User registered successfully!')
                  console.log('User '+ res.user.uid +' registered successfully!')
                  this.setState({
                    isLoading: false,
                    // userName: '',
                    // mobileNumber:'',
                    // email: '', 
                    // password: '',
                    // postalAddress: '',
                  })
                  this.props.navigation.navigate('Map')
                })
                .catch(error => {
                  this.setState({ errorMessage: error.message })
                  Alert.alert(error.message)
                })
              } else {
                Alert.alert('Enter Valid Postal Address!')
              }
            } else {
              Alert.alert('Enter Valid Mobile Number!')
            }
          } else {
            Alert.alert('Enter Valid User Name!')
          }
        } else {
          Alert.alert('Password does not Match!') 
        }
      } else {
        Alert.alert('Enter Valid Password!')
      }
    } else {
      Alert.alert('Enter Valid Email!')      
    }
  }

  // storeClient() {
  //   console.log("1");
  //   if(this.state.name === ''){
  //    alert('Fill at least your name!')
  //   } else {
  //     console.log("2");
  //     this.setState({
  //       isLoading: true,
  //     });
  //     console.log();
  //     firestore().collection('clients').doc(this.state.uid).set({
  //       userName: this.state.userName,
  //       email: this.state.email,
  //       mobileNumber: this.state.mobileNumber,
  //       password: this.state.password
  //     }).then((res) => {
  //       console.log("3");
  //       this.setState({
  //         userName: '',
  //         email: '',
  //         mobileNumber: '',
  //         password:'',
  //         isLoading: false,
  //       });
  //       this.props.navigation.navigate('Registration')
  //     })
  //     .catch((err) => {
  //       console.error("Error found: ", err);
  //       this.setState({
  //         isLoading: false,
  //       });
  //     });
  //   }
  // }

  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <LinearGradient colors={["#ffffff", "#00EDFF"]} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headingText}>Create a new Account</Text>
          <TextInput
          value={this.state.userName}
          onChangeText={(val) => this.handleUpdateInput(val, 'userName')}
          style={styles.textInput} 
          placeholder="User Name" 
          placeholderTextColor="grey"/>

          <TextInput 
          value={this.state.mobileNumber}
          onChangeText={(val) => this.handleUpdateInput(val, 'mobileNumber')}
          style={styles.textInput} placeholder="Mobile Number" 
          keyboardType='numeric'
            maxLength={11}
          placeholderTextColor="grey"/>

          <TextInput 
          value={this.state.email}
          onChangeText={(val) => this.handleUpdateInput(val, 'email')}
          style={styles.textInput} placeholder="Enter Email Address" 
          placeholderTextColor="grey"/>

          <TextInput 
          value={this.state.postalAddress}
          onChangeText={(val) => this.handleUpdateInput(val, 'postalAddress')}
          style={styles.textInput} placeholder="Postal Address" 
          placeholderTextColor="grey"/>

          <TextInput
            value={this.state.password}
            onChangeText={(val) => this.handleUpdateInput(val, 'password')}
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry
          />
          <TextInput
            value={this.state.confirmPassword}
            onChangeText={(val) => this.handleUpdateInput(val, 'confirmPassword')}
            style={styles.textInput}
            placeholder="Confirm Passwrd"
            placeholderTextColor="grey"
            secureTextEntry
          />
          {/* <View style={styles.btnCont}>
            <TouchableOpacity style={styles.btn}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/fb-logo.png")}
              />
              <Text style={{ marginLeft: 10 }}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/google-logo.png")}
              />
              <Text style={{ marginLeft: 10 }}>Google</Text>
            </TouchableOpacity>
          </View> */}
          <Button
            style={{ width: 200 }}
            title="Register"
            onPress={() => {this.registerUser()}}//; this.storeClient()
          />
          <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text> 
        </SafeAreaView>
      </LinearGradient>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: '#3740FE',
    marginTop: 10,
    textAlign: 'center'
  },
  headingText: {
    fontSize: 25,
    color: "orange",
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    width: "80%",
    backgroundColor: "#fff",
    marginBottom: 10,
    color:"black",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#fff",
    width: "40%",
    padding: 10,
    flexDirection: "row",
    borderRadius: 10,
  },
  btnCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
});

export default RegistrationScreen;
