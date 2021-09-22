import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "galio-framework";
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from 'react-native-datepicker'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'




class DryCleaningScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shirtsCount: 0,
      pantsCount: 0,
      trowsersCount: 0,
      sandowsCount: 0,
      innersCount: 0,
      date: moment(new Date()).format('YYYY-MM-DD'),
      maxcalDate:'',
      mindate:'' 
    };
  }
    
  // change code below this line
  increment(name) {
    this.setState({
      [name]: this.state[name] + 1,
    });
  }

  decrement(name) {
    if (this.state[name] == 0) {
      this.setState({
        [name]: 0,
      });
    } else {
      this.setState({
        [name]: this.state[name] - 1,
      });
    }
  } 
 
  _storeData = async () => {
    let items={
      shirts: this.state.shirtsCount,
      pants: this.state.pantsCount,
      trowsers: this.state.trowsersCount,
      sandows: this.state.sandowsCount,
      inners: this.state.innersCount
    }
    try {
      await AsyncStorage.setItem("DryCleaning",JSON.stringify(items));
    } catch (error) {
      // Error saving data
      // Alert.alert(error)
    }
  };

  _placeOrder = async () => {
    try {
      const dryclean = await AsyncStorage.getItem("DryCleaning")
      const drycleanParsed = JSON.parse(dryclean)
      const ironing = await AsyncStorage.getItem("Ironning")
      const ironingParsed = JSON.parse(ironing)
      const wash = await AsyncStorage.getItem("Washing")
      const washParsed = JSON.parse(wash)
      console.log("ffffff");
      const id = auth().currentUser.uid
      const randomId = firestore().collection('clients').doc(id).collection('orders').doc().id

      


      firestore().collection('clients').doc(id).collection('orders').doc(randomId).set({
        userId: id,
        status: "pending",
        pickUpDate: this.state.date,
        deliveryDate: this.state.maxcalDate
      }).then((res) => {
        console.log("Dryclean stored!" ) 
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
      console.log('break!!!!!!!');

      

      firestore().collection('clients').doc(id).collection('orders').doc(randomId).collection('date').doc('Dryclean').set({
            shirts: drycleanParsed.shirts,
            pants: drycleanParsed.pants,
            trowsers: drycleanParsed.trowsers,
            sandows: drycleanParsed.sandows,
            inners: drycleanParsed.inners,
           
            //docId: firestore().collection('clients').doc(id).collection('orders').doc().collection('date').doc().id
          }).then((res) => {
            console.log("Dryclean stored!");
            
            AsyncStorage.removeItem('DryCleaning')
          })
          .catch((err) => {
            console.error("Error found: ", err);
          });
      console.log('break!!!!!!!')

      firestore().collection('clients').doc(id).collection('orders').doc(randomId).collection('date').doc('ironning').set({
            shirts: ironingParsed.shirts,
            pants: ironingParsed.pants,
            trowsers: ironingParsed.trowsers,
            sandows: ironingParsed.sandows,
            inners: ironingParsed.inners,
            shalwarKameez: ironingParsed.shalwarKameez,
            coats: ironingParsed.coats,
            threePiece: ironingParsed.threePiece,
            formalPants: ironingParsed.formalPants,
            sherwaniCount: ironingParsed.sherwani,
            status: "pending"
          }).then((res) => {
            console.log("Ironning stored!");
            AsyncStorage.removeItem('Ironning')
          })
          .catch((err) => {
            console.error("Error found: ", err);
          });
      console.log('break!!!!!!!')

      firestore().collection('clients').doc(id).collection('orders').doc(randomIds).collection('date').doc('washing').set({
            shirts: washParsed.shirts,
            pants: washParsed.pants,
            trowsers: washParsed.trowsers,
            sandows: washParsed.sandows,
            inners: washParsed.inners,
            shalwarKameez: washParsed.shalwarKameez,
            coats: washParsed.coats,
            threePiece: washParsed.threePiece,
            formalPants: washParsed.formalPants,
            sherwani: washParsed.sherwani,
            largeBedsheets: washParsed.largeBedsheets,
            mediumBedsheets: washParsed.mediumBedsheets,
            smallBedsheets: washParsed.smallBedsheets,
          }).then((res) => {
            console.log("Wash stored!");
            AsyncStorage.removeItem('Washing')
          })
          .catch((err) => {
            console.error("Error found: ", err);
          });
    } catch (error) {
      // Alert.alert(error)
    }
  };
  

  render() {
      const DateTime = () => {
     
      
      return (
        <View style={styles.container2}>
        <Text style={styles.mainHeading}>Set a Pick Up date</Text>

        <DatePicker
        style={{width: 200, marginTop:30, marginLeft:"20%"}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.state.date}
        maxDate="2090-12-12"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(dates) => {
         var date = new Date(dates).getDate()+3; //To get the Current Date
         var month = new Date().getMonth() + 1; //To get the Current Month
         var year = new Date().getFullYear();// To get year
         let enddate =year+"-"+month+"-"+date
         console.log("Pick-Up Date"+this.state.date)
          this.setState({date: dates,
            mindate:enddate
          })}}
      />
          <Text style={styles.mainHeading}>Set a Delivery date</Text>
           <View style={{flexDirection:'row',alignContent:'center',justifyContent:'center'}}>
          </View>
          <DatePicker
            style={{width: 200, marginTop:30, marginLeft:"20%"}}
            date={this.state.maxcalDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate={this.state.mindate}
            maxDate="2090-12-12"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
            this.setState({maxcalDate:date});
            console.log("Delivery Date"+this.state.maxcalDate)
            }}
          />

          <TouchableOpacity style={styles.nextbutton} onPress={() => this.RBSheet.close()}>
                <Text style={styles.nextButtonText}>Done</Text>
          </TouchableOpacity> 
        </View>
      )
    }

    return (
      <View>
      <ScrollView style={{ backgroundColor: "white", marginBottom:100}}>
        <View style={styles.container}>
          <View
            style={{
              borderBottomColor: "#999999",
              borderBottomWidth: 1,
            }}
          >
            <Text style={styles.orderHeading}>Clothes</Text>
            <Text p muted>
              PKR 50 per piece
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text p muted style={{ flex: 1, fontSize: 20 }}>
              Shirts
            </Text>
            <View style={styles.counterBox}>
              <TouchableOpacity onPress={() => this.decrement('shirtsCount')}>
                <Text p muted>
                  {" "}
                  -{" "}
                </Text>
              </TouchableOpacity>
              <Text p muted>
                {"   "}{this.state.shirtsCount}{"   "}
              </Text>
              <TouchableOpacity onPress={() => this.increment('shirtsCount')}>
                <Text p muted>
                  {" "}
                  +{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text p muted style={{ flex: 1, fontSize: 20 }}>
              Pants
            </Text>
            <View style={styles.counterBox}>
              <TouchableOpacity onPress={() => this.decrement('pantsCount')}>
                <Text p muted>
                  {" "}
                  -{" "}
                </Text>
              </TouchableOpacity>
              <Text p muted>
                {"   "}{this.state.pantsCount}{"   "}
              </Text>
              <TouchableOpacity onPress={() => this.increment('pantsCount')}>
                <Text p muted>
                  {" "}
                  +{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text p muted style={{ flex: 1, fontSize: 20 }}>
              Trowsers
            </Text>
            <View style={styles.counterBox}>
              <TouchableOpacity onPress={() => this.decrement('trowsersCount')}>
                <Text p muted>
                  {" "}
                  -{" "}
                </Text>
              </TouchableOpacity>
              <Text p muted>
                {"   "}{this.state.trowsersCount}{"   "}
              </Text>
              <TouchableOpacity onPress={() => this.increment('trowsersCount')}>
                <Text p muted>
                  {" "}
                  +{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text p muted style={{ flex: 1, fontSize: 20 }}>
              Sandows
            </Text>
            <View style={styles.counterBox}>
              <TouchableOpacity onPress={() => this.decrement('sandowsCount')}>
                <Text p muted>
                  {" "}
                  -{" "}
                </Text>
              </TouchableOpacity>
              <Text p muted>
                {"   "}{this.state.sandowsCount}{"   "}
              </Text>
              <TouchableOpacity onPress={() => this.increment('sandowsCount')}>
                <Text p muted>
                  {" "}
                  +{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: "#999999",
              borderBottomWidth: 1,
            }}
          >
            <Text style={styles.orderHeading}>Under Garments</Text>
            <Text p muted>
              PKR 20 per piece
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text p muted style={{ flex: 1, fontSize: 20 }}>
              Total Count
            </Text>
            <View style={styles.counterBox}>
              <TouchableOpacity onPress={() => this.decrement("innersCount")}>
                  <Text p muted>
                    {" "}
                    -{" "}
                  </Text>
                </TouchableOpacity>
                <Text p muted>
                  {"   "}
                  {this.state.innersCount}
                  {"   "}
                </Text>
                <TouchableOpacity onPress={() => this.increment("innersCount")}>
                  <Text p muted>
                    {" "}
                    +{" "}
                  </Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
     
      <TouchableOpacity style={{bottom:90,justifyContent:'center'}} onPress={() => this.RBSheet.open()}>
        <Text style={styles.dateTimeText}>Set date </Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',alignContent:'center',justifyContent:'center'}}>
        <TouchableOpacity style={styles.nextbutton2} onPress={() => {this._storeData(); this.props.navigation.navigate("Home")}}>
            <Text style={styles.nextButtonText}>Add More</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.nextbutton2} onPress={() => {this._storeData(); this._placeOrder(); this.props.navigation.navigate("OrderDetail")}}>
            <Text style={styles.nextButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
      
      
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          closeOnPressMask={true}
          height={600}
          openDuration={100}
          closeDuration={100}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >   
          <DateTime>
          </DateTime>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom:10
  },
  
  container2:{
      width:"100%",
      height:"100%",
  },

  orderHeading: {
    fontSize: 25,
    textAlign: "left",
  },
  counterBox: {
    borderColor: "#1e90ff",
    borderWidth: 1,
    alignSelf: "flex-end",
    flexDirection: "row",
    borderRadius: 5,
  },
  dateTimeText:{
    color:"#2599FE",
    fontSize:18,
    textAlign:"center"
},
  nextbutton2:{
    backgroundColor:"#084E96",
    width:"30%",
    borderRadius:6,
    marginLeft:"5%",
    bottom:80
  },
  mainHeading:{
    fontSize: 25,
    fontWeight:"bold",
    textAlign:"center",
    marginTop:20
},


displayDate:{  
    padding:10,
    borderColor:'#7D7D7D',
    borderWidth: 1,
    borderRadius:6,
    width: "35%",
    textAlign:"center",
    marginLeft:"7%",
    color:'#7D7D7D',
    marginTop:"5%"
},

displayTime:{
    padding:10,
    borderColor:'#7D7D7D',
    borderWidth: 1,
    borderRadius:6,
    width: "35%",
    textAlign:"center",
    marginLeft:"15%",
    color:'#7D7D7D'
},

datetimeview:{
  flexDirection: "row",
  alignItems:"flex-end"
},

customStylesHere: {
    color: "#eee"
},
setHr:{
    marginTop:20,
    width:1000
},
nextbutton:{
    backgroundColor:"#084E96",
    width:"30%",
    borderRadius:6,
    marginTop: 25,
    marginLeft:"34%"
},
nextButtonText:{
    textAlign:"center",
    color:"white",
    padding:10
},
showbutton:{
  backgroundColor:"#084E96",
  width:"30%",
  borderRadius:6,
  marginLeft:"5%",
  marginTop:"5%"
},
showButtonText:{
    textAlign:"center",
    color:"white",
    padding:10
}

});

export default DryCleaningScreen;