import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Button,
  TextInput,
  Alert
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class LoginScreen extends React.Component {

  constructor() {
    super();
    
    this.state = { 
      email: '', 
      password: ''
    }
  }


  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else{
      auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        firestore().collection('clients').doc(res.user.uid).get()
          .then((doc) => {
            console.log('data'+ doc.data());
            if(doc.exists){
              Alert.alert('User logged-in successfully!')
              console.log(doc)
              console.log('User logged-in successfully!')
              this.setState({
                isLoading: false,
                email: '', 
                password: ''
              })
              this.props.navigation.navigate('Map')
            }else{
              Alert.alert("Invalid User!")
            }
          })
          .catch((err) => {
            console.error("Error found: ", err);
          });
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }
    

  
  render() {
    return (
      <LinearGradient colors={["#ffffff", "#00EDFF"]} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headingText}>Login</Text>
          
          <TextInput 
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
          style={styles.textInput} 
          placeholder="Enter Email" 
          placeholderTextColor="grey"/>

          <TextInput
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry
          />
          <Button
            title="Sign in"
            onPress={() => this.userLogin()}
          />
          <Text 
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Registration')}>
            Don't have account? Click here to signup
          </Text>   
        </SafeAreaView>
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
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
});

export default LoginScreen;
