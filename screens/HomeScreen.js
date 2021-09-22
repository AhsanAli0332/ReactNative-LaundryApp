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
  linear,
  TouchableOpacity,
  Image,
  Alert
  
} from "react-native";
import { LogBox } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { Drawer } from 'react-native-material-drawer';
import { Block } from 'galio-framework';
import auth from '@react-native-firebase/auth';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      email:''
    }
    LogBox.ignoreAllLogs();
  }

  logout = () => {
    auth()
    .signOut()
    .then(() => this.props.navigation.navigate("Login"))
    .catch(error=>{
      Alert.alert(error.message)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Drawer
          open={this.state.isOpen}
          fullHeight={true}
          pageHeight={"100%"}
          drawerContent={
          <View>
           <Text style={{fontSize:20, textAlign:"center", marginTop:'10%',marginBottom:'10%'}}>UserName</Text>

            <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
            <Block 
              height={50}
              space="evenly"
              >
              <View style={{flexDirection:"row"}}>
                <Image
                      style={{ width: 20, height: 20, marginLeft: 10 }}
                      source={require("../assets/profile.png")}
                    />
                  <Text style={{marginLeft: 15, fontSize:15}}>
                    My profile
                  </Text>
                </View>
            </Block>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
            <Block 
             
            height={50}
            space="evenly"
            
            style={{marginTop:10}}
            >
             <View style={{flexDirection:"row"}}>
            <Image
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                    source={require("../assets/logout.png")}
                  />
              <Text style={{marginLeft: 15, fontSize:15}}>
                Logout
              </Text>
              </View>
            </Block>
            </TouchableOpacity>
          </View>
          }
          onClose={() => this.setState({ isOpen: false })}
          animationTime={250}
          fullHeight = {true} 
         >
          <LinearGradient colors={["#ffffff", "#00EDFF"]} style={{ flex: 1 }}>
           <SafeAreaView style={styles.container}>

           
           <TouchableOpacity 
             style={styles.drawerIcon}
             onPress={() => this.setState({ isOpen: !this.state.isOpen })}>
                  <Image
                    style={{ width: 35, height: 35 }}
                    source={require("../assets/menu.png")}
                  />
                </TouchableOpacity>


            <TouchableOpacity><Text style={styles.headingText}>Laundry</Text></TouchableOpacity>
            
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.containerView}>
                <TouchableOpacity
                  style={styles.homeContainer}
                  onPress={() => this.props.navigation.navigate("DryCleaning")}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../assets/dry-clean.png")}
                  />
                  <Text style={styles.containerText}>Dry Cleaning</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.homeContainer}
                  onPress={() => this.props.navigation.navigate("Washing")}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../assets/washing.png")}
                  />
                  <Text style={styles.containerText}>Washing</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.containerView}>
                <TouchableOpacity
                  style={styles.homeContainer}
                  onPress={() => this.props.navigation.navigate("Ironning")}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../assets/ironning.png")}
                  />
                  <Text style={styles.containerText}>Ironning</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.homeContainer}
                  onPress={() => this.props.navigation.navigate("OrderStatus")}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../assets/orders.png")}
                  />
                  <Text style={styles.containerText}>Orders</Text>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
      </LinearGradient>
        </Drawer>
      </View>
      
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
  headingText: {
    fontSize: 25,
    color: "orange",
    marginTop: "10%",
    marginBottom: 10,
  },
  drawerIcon: {
    marginTop: "20%",
    marginRight:"80%"
  
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
  },
  homeContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    width: "40%",
    height: "60%",
  },
  containerView: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerText: {
    fontSize: 17,
    paddingTop: 10,
  },
});

export default HomeScreen;
