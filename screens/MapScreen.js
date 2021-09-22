import React, {useState} from 'react'
import { View, Text, StyleSheet,TextInput,TouchableOpacity,PermissionsAndroid, Platform } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";
import Geolocation from '@react-native-community/geolocation'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const MapScreen = () => {

  const [lat,setLat] = useState(0)
  const [lng,setLng] = useState(0)

  Geolocation.getCurrentPosition(data => {
    setLat(data.coords.latitude)
    setLng(data.coords.longitude)
    // console.log(auth().currentUser.uid)
    firestore().collection('clients').doc(auth().currentUser.uid).update({
            'latitude': lat,
            'longitude': lng,
          }).then((res) => {
            console.log("3");
          })
          .catch((err) => {
            console.error("Error found: ", err);
          });
  })

  const InitialRegion = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0060,
    longitudeDelta: 0.0060,
  }
  
  const navigation = useNavigation();

  return(
    <LinearGradient colors={["#ffffff", "#00EDFF"]}>
    <View style={styles.container}>
    <View style={styles.mapStyle}>

    <MapView
      style={{ width: '100%', height: '100%' }}
      initialRegion={InitialRegion}
      showsUserLocation={true}
      showsMyLocationButton={true}
      zoomControlEnabled={true}
      //  onPress={e => setMarker(e.nativeEvent.coordinate)}
    >
    
    <Marker
      coordinate={{
        latitude: lat,
        longitude: lng,
      }}
    />
    
    </MapView>
    
    </View>
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Street Name/No. , Area Name"
        placeholderTextColor="#000"
        // selectionColor={}
        // underlineColorAndroid={}
      />

      <TextInput
        style={styles.textInput}
        placeholder="House / Flat No."
        placeholderTextColor="#000"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Vendors")}
      >
        <Text style={styles.btntext}>Button</Text>
      </TouchableOpacity>
    </View>
      
    </View>
    </LinearGradient>
  )
}

// class MapScreen extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       latitude: 0 ,
//       longitude: 0 ,
//       latitudeDelta: 0.0060 ,
//       longitudeDelta: 0.0060 ,
//       loading: false ,
//     }
//   }

//   locations = () =>{ GetLocation.getCurrentPosition({
//     enableHighAccuracy: true,
//     timeout: 15000,
//   })
//   .then(location => {
//     this.setState({loading:true})
//     this.setState({latitude:location.latitude})
//     this.setState({longitude:location.longitude})
//     this.setState({loading:false})
//   })
//   .catch(error => {
//     const { code, message } = error;
//     console.warn(code, message);
//   })
//   }
//   // const InitialRegion = {
//   //   latitude
//   //   longitude
//   //   latitudeDelta
//   //   longitudeDelta
//   // }
  
//   render(){
//     if(this.state.loading){
//       return null;
//     }else{
//       return(
//       <LinearGradient colors={["#ffffff", "#00EDFF"]}>
//       <View style={styles.container}>
//       <View style={{height: '60%', width: '100%'}}>
//       <MapView
//         style={{ width: '100%', height: '100%' }}
//         region={{
//           latitude: this.state.latitude,
//           longitude: this.state.longitude,
//           latitudeDelta: 0.0060,
//           longitudeDelta: 0.0060,
//         }}
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         zoomControlEnabled={true}
//         //  onPress={e => setMarker(e.nativeEvent.coordinate)}
//         >
//        <Marker
//         coordinate={{
//           latitude: this.state.latitude,
//           longitude: this.state.longitude,
//         }}
//         //title={marker.title}
//         //description={marker.description}
//       />

//       </MapView>
//       </View>
//         <View>
//              <TextInput
//               style={styles.textInput}
//               placeholder="Street Name/No. , Area Name"
//               placeholderTextColor="#000"
//               // selectionColor={}
//               // underlineColorAndroid={}
//             />

//             <TextInput
//               style={styles.textInput}
//               placeholder="House / Flat No."
//               placeholderTextColor="#000"
//               // selectionColor={}
//               // underlineColorAndroid={}
//             />

//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => this.props.navigation.navigate("Home")}
//             >
//               <Text style={styles.btntext}>Button</Text>
//             </TouchableOpacity>
//           </View>
      
//       </View>
//       </LinearGradient>
//     )
//   }
// }
//}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  mapStyle: {
    height: "65%",
  },
  textInput: {
    width: "90%",
    marginTop: "5%",
    marginLeft: "5%",
    borderRadius: 10,
    color:"#000",
    borderColor:"black",
    borderWidth:1,
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    marginLeft: "37.5%",
    marginTop: "4%",
    width: "25%",
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "#084E96",
  },
  btntext: {
    textAlign: "center",
    color: "white",
  },
});

export default MapScreen;