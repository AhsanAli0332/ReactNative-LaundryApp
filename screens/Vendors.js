import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Text } from "galio-framework";
import firestore from '@react-native-firebase/firestore';

class Vendors extends React.Component {
  constructor(props){
    super(props);

    this.state={
      data:[],
      data2:[],
      data3:[],
      mainData:[],
      isLoading: false
    }
    
  }

componentDidMount(){
  this.getRequest();
}

  getRequest = () => {
    this.setState({isLoading:true})

    let jsonObjUser = []
    var userDetails = [] 

    
    firestore()
    .collection('Vendors')
    .get()
    .then(querySnapshot => {
      //console.log('Total clients: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
        userDetails.push(documentSnapshot.data());
        // var clientId = documentSnapshot.id
        // var clientData = documentSnapshot.data()

        let tempobj = {
            name: documentSnapshot.data().userName,
            address: documentSnapshot.data().shopAddress,
            area: documentSnapshot.data().shopArea,
            email: documentSnapshot.data().email,
        }
        jsonObjUser.push(tempobj)
         console.log('User ID: ', documentSnapshot.id);
        console.log('User Details: ', documentSnapshot.data());
        // console.log("client Id is: ", clientId);
      }); 
    }).then(testing=>{
      this.setState({data:jsonObjUser});
      console.log('data here ========== ' + this.data);
    });
    this.setState({isLoading:false})
  }

  actionOnRow = async (item,navigateTo) => {
    try {
      this.props.navigation.navigate(navigateTo, {
            // P1:item.name,
            // P2:item.address,
            vendorEmail:item.email
          });
      //await AsyncStorage.setItem("Order",JSON.stringify(item));
      
    } catch (error) {
      
      // Error saving data
      // Alert.alert(error)
    }
   
    console.log('Selected Item :',item.email);
  }

  render() {  
    return (
      this.state.isLoading ? <ActivityIndicator size="large" color="black" style={{flex:1,alignSelf:'center'}} /> :
      <SafeAreaView style={styles.container}>
       
       <View style={{width:"100%", alignItems:"center", marginTop:20}}>
        <Text style={styles.blueText2}>Please select a suitable vendor for you</Text>
       </View>
          {/*orders count within specific time*/}
          <Text style={styles.blueText3}>{this.state.data.length} Vendors Found</Text>
          <FlatList 
          data = {this.state.data}
          keyExtractor={(item, index)=> index.toString()}
          renderItem={({item , index})=>(
              <View style={styles.orderBlocks}>
                <View style={{flex:3,flexDirection:'column'}}>
                    <View style={styles.innerBlock}>
                        <Text style={styles.customerName}>{item.name}</Text>
                        
                    </View>
                        <View style={styles.innerBlock}>
                        <Text p muted style={{fontSize:15}}>
                            {item.address}
                        </Text>
                        
                        </View>

                        <View style={styles.innerBlock}>
                        <Text p muted>
                            {item.area}
                        </Text>
                    </View>
                </View>
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity 
                        style = {styles.orderAcceptBtn}
                        onPress = {() => {this.actionOnRow(item,'Home')}}
                    >
                        <Text style={styles.orderAcceptTxt}>Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.orderDetailBtn}
                        onPress={() => {this.actionOnRow(item,'OrderDetail')}}
                    >
                        <Text style={styles.blueText}>Prices</Text>
                    </TouchableOpacity>
                </View>
                
              </View>
          )}
        />

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scroll: {
    marginTop: -20,
  },
  completedTime: {
    fontSize: 10,
  },
  orderStatus: {
    marginRight: 8,
  },
  orderBlocks: {
    flex:1,
    flexDirection:'row',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customerName: {
    fontSize: 20,
    color: "#084E96",
  },
  blueText3: {
    color: "#084E96",
    marginTop:20
  },
  blueText2: {
    color: "#084E96",
    fontSize:30,
    textAlign:"center"
  },
  orderDetailBtn: {
    borderWidth: 0.5,
    borderColor: "#084E96",
    padding: 5,
    borderRadius: 10,
    width: "95%",
    marginTop:10,
    alignItems: "center",
  },
  innerBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  orderAcceptBtn: {
    borderWidth: 0.5,
    borderColor: "#660014",
    padding: 5,
    borderRadius: 10,
    backgroundColor: "dodgerblue",
    width: "95%",
    alignItems: "center",
  },
  orderAcceptTxt: {
    color: "white",
  },
});

export default Vendors;
