import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Text } from "galio-framework";
import Hr from "react-native-hr-component";
import Svg, { Circle, Rect } from "react-native-svg";

class OrderDetail extends React.Component {
  render() {
    return (
      // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.mainHeading}>Delivery Address</Text>
          <Text p muted style={styles.showAddress}>
            ABC Street, Block-E, Saima Arabian Villas, Karachi
          </Text>
          <TouchableOpacity>
            <Text style={styles.changeAddress}>Change Address</Text>
          </TouchableOpacity>

          <Hr lineColor="#eee" width={1} text="" hrStyles={styles.setHr} />

          <Text style={styles.mainHeading}>Order Details</Text>

          <View style={{ flexDirection: "row" }}>
            <Text p muted style={styles.showAddress}>
              PickUp
            </Text>
            <Text p muted style={styles.showdelivery}>
              Delivery
            </Text>
          </View>

          <View style={styles.pointsView}>
            <Svg height="20" width="20" viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#707070"
                strokeWidth="2"
                fill="#C7C7C7"
              />
            </Svg>

            <Hr lineColor="#eee" width={1} text="" hrStyles={styles.setHr2} />

            <Svg height="20" width="20" viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#707070"
                strokeWidth="2"
                fill="#C7C7C7"
              />
            </Svg>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text p muted style={styles.showPickupTime}>
              Tommorow, 12pm
            </Text>
            <Text p muted style={styles.showDeliveryTime}>
              20-01-2021, 2pm
            </Text>
          </View>
          <View style={{ height: 200 }}>
            <ScrollView style={styles.ScrollView}>
              <Text style={styles.mainSubHeading}>Cloths</Text>
              <Text p muted style={styles.showAddress}>
                Shirts: 3 , Pants:2
              </Text>

              <Text style={styles.mainSubHeading}>Bedsheets</Text>
              <Text p muted style={styles.showAddress}>
                Shirts: 3 , Pants:2
              </Text>

              <Text style={styles.mainSubHeading}>Curtains</Text>
              <Text p muted style={styles.showAddress}>
                Shirts: 3 , Pants:2
              </Text>

              <Text style={styles.mainSubHeading}>Casual</Text>
              <Text p muted style={styles.showAddress}>
                Shirts: 3 , Pants:2
              </Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.fixedBottomText}>Total Cost :</Text>
          <Text style={styles.displayTime}>PKR 200</Text>
        </View>
        <View style={{ alignItems: "center",height: 40, marginTop:15}}>
          <TouchableOpacity style={styles.nextbutton} 
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    // alignContent:"center",
    paddingRight: 10,
    paddingLeft: 10,
    marginTop:30,
  },
  subContainer: {
    // backgroundColor: 'red',
    alignSelf: "center",
    marginTop: -60,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: -25,
  },
  mainSubHeading: {
    fontSize: 25,
    fontWeight: "900",
    marginTop: 5,
  },
  showAddress: {
    marginTop: 5,
    fontSize: 20,
  },
  showdelivery: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: "60%",
  },
  changeAddress: {
    color: "#2599FE",
    fontSize: 15,
    marginTop: 5,
  },
  setHr: {
    marginTop: 5,
    width: "100%",
  },
  setHr2: {
    marginTop: 0,
    width: "70%",
  },
  pointsView: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 40,
  },
  showPickupTime: {
    marginTop: 10,
    fontSize: 15,
  },
  showDeliveryTime: {
    marginTop: 10,
    fontSize: 15,
    marginLeft: "29%",
  },
  ScrollView: {
    marginBottom: 0,
    borderColor: "black",
    borderWidth: 1,
  },
  bottomView: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    // height: "100%",
    width: "100%",
  },
  fixedBottomText: {
    fontSize: 25,
    fontWeight: "900",
    marginBottom: 0,
    marginLeft: 10,
    marginTop: 5,
  },
  displayTime: {
    marginTop: 12,
    marginLeft: "37%",
    fontSize: 20,
  },
  nextbutton: {
    backgroundColor: "#084E96",
    width: "30%",
    height: "100%",
    borderRadius: 6,
    // marginTop: 40,
    marginTop: "0%",
    position: "absolute",
  },
  nextButtonText: {
    textAlign: "center",
    color: "white",
    padding: 10,
  },
});

export default OrderDetail;
