import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Text

} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Block, Button } from 'galio-framework';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LogBox } from 'react-native';

class Profile extends React.Component {

    constructor(props){
        super(props);
    
        this.state={
          dataMain:''
        }
        LogBox.ignoreAllLogs();
      }
      
componentDidMount(){
    this.getRequest();
}


    getRequest = () => {
        const id = auth().currentUser.uid
        firestore().collection('clients').doc(id).onSnapshot(documentSnapshot => {
        // console.log("my data is "+ data.userName)    
        // console.log('User data: ', documentSnapshot.data());
        this.setState({dataMain:documentSnapshot.data()})
      });

     
    // Stop listening for updates when no longer required
    }

  render(){   
    return (
      <LinearGradient colors={["#ffffff", "#00EDFF"]} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headingText}>YOUR PROFILE DETAILS</Text>

          <Text style={{
            fontSize: 15,
            color: "black",
            marginTop:15,
            marginRight:"75%"}}>Name</Text>
          <Block 
              width ={"90%"}
              card = {true}
              height={50}
              space="evenly"
              style={{backgroundColor:"white", marginTop: 5}}
              >
              <Text style={{marginLeft: 15, fontSize:15}}>
              {this.state.dataMain.userName}
              </Text>
          </Block>

          <Text style={{
            fontSize: 15,
            color: "black",
            marginTop:15,
            marginRight:"76%"}}>Email</Text>
          <Block 
              width ={"90%"}
              card = {true}
              height={50}
              space="evenly"
              style={{backgroundColor:"white", marginTop: 5}}
              >
              <Text style={{marginLeft: 15, fontSize:15}}>
              {this.state.dataMain.email}
              </Text>
          </Block>

          <Text style={{
            fontSize: 15,
            color: "black",
            marginTop:15,
            marginRight:"58%"}}>Mobile Number</Text>
          <Block 
              width ={"90%"}
              card = {true}
              height={50}
              space="evenly"
              style={{backgroundColor:"white", marginTop: 5}}
              >
              <Text style={{marginLeft: 15, fontSize:15}}>
              {this.state.dataMain.mobileNumber}
              </Text>
          </Block>

          <Text style={{
            fontSize: 15,
            color: "black",
            marginTop:15,
            marginRight:"58%"}}>Postal Address</Text>
          <Block 
              width ={"90%"}
              card = {true}
              height={50}
              space="evenly"
              style={{backgroundColor:"white", marginTop: 5}}
              >
              <Text style={{marginLeft: 15, fontSize:15}}>
              {this.state.dataMain.postalAddress}
              </Text>
          </Block>

          <Text style={{
            fontSize: 15,
            color: "black",
            marginTop:15,
            marginRight:"68%"}}>Password</Text>
          <Block 
              width ={"90%"}
              card = {true}
              height={50}
              space="evenly"
              style={{backgroundColor:"white", marginTop: 5}}
              >
              <Text style={{marginLeft: 15, fontSize:15}}>
              {this.state.dataMain.password}
              </Text>
          </Block>
         
         
          
          
          <Button
            color="success"
            style={{ width: 150, marginTop:30 }}
            onPress={() => this.props.navigation.navigate("Home")}
          >
          <Text style={{color:"white"}}>Done</Text>
          </Button>

        </SafeAreaView>
      </LinearGradient>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems:"center",
    justifyContent:"center",
  },
  
  headingText: {
    fontSize: 25,
    color: "orange",
    marginTop: 10,
    marginBottom: 10,
  },
  
  headingText2: {
    fontSize: 15,
    color: "black",
    marginTop:15,
    marginRight:"55%"
  
  },
  
  
});

export default Profile;
