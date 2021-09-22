import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import Hr from "react-native-hr-component";
import location from "../assets/location.png";
import line from "../assets/line.png";
import shop from "../assets/shop.png";
import order from "../assets/order.png";
import truck from "../assets/truck.png";
import machine from "../assets/machine.png";
import shirt from "../assets/shirt.png";

export default class PaymentScreen extends Component {
  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return date + "-" + month + "-" + year;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.mainText}>Order Details</Text>
            <Text style={styles.orderIdText}>#12345678</Text>
          </View>

          <Hr lineColor="#eee" width={1} text="" hrStyles={styles.setHr} />

          <View style={styles.subcontainer}>
            <View style={styles.subcontainercol1}>
              <Image source={location} style={{ width: 50, height: 50 }} />
              <Image source={line} style={{ width: 1, height: 20 }} />
              <Image
                source={shop}
                style={{ width: 45, height: 45, marginTop: 5 }}
              />
              <Hr lineColor="#eee" width={1} text="" hrStyles={styles.setHr} />
              <Image
                source={order}
                style={{ width: 41, height: 45, marginTop: 5 }}
              />
              <Image
                source={line}
                style={{ width: 1, height: 30, marginTop: 5 }}
              />
              <Image
                source={truck}
                style={{ width: 45, height: 45, marginTop: 5 }}
              />
              <Image
                source={line}
                style={{ width: 1, height: 30, marginTop: 5 }}
              />
              <Image
                source={machine}
                style={{ width: 45, height: 45, marginTop: 5 }}
              />
              <Image
                source={line}
                style={{ width: 1, height: 30, marginTop: 5 }}
              />
              <Image
                source={shirt}
                style={{ width: 45, height: 45, marginTop: 5 }}
              />
            </View>

            <View style={styles.subcontainercol2}>
              <Text style={styles.subcontainercol2Text}>
                House# 12, ABC Stree, Block#13, FB area, Karachi
              </Text>

              <Text style={styles.subcontainercol2Text2}>
                Shop#12, Abc Street, Block#13, FB Area, Karachi.
              </Text>

              <Text style={styles.subcontainercol2Text3Heading}>
                Order Placed
              </Text>
              <Text style={styles.subcontainercol2Text3}>
                Your order placed successfully our executive will collect the
                clothes{" "}
              </Text>

              <Text style={styles.subcontainercol2Text4Heading}>
                On the way
              </Text>
              <Text style={styles.subcontainercol2Text3}>
                Your order placed successfully our executive will collect the
                clothes{" "}
              </Text>

              <Text style={styles.subcontainercol2Text5Heading}>
                In process
              </Text>
              <Text style={styles.subcontainercol2Text3}>
                Please wait we are still processing your order{" "}
              </Text>

              <Text style={styles.subcontainercol2Text5Heading}>
                Laundry is cleaned
              </Text>
              <Text style={styles.subcontainercol2Text3}>
                Our executive will deliver your order on Monday, 9th Oct 2020
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.nextbutton}>
            <Text
              style={styles.nextButtonText}
              onPress={() => this.props.navigation.navigate("OrderDetail")}
            >
              Order Status
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 10,
    paddingTop: 0,
  },

  subcontainer: {
    width: "100%",

    flexDirection: "row",
  },
  subcontainercol1: {
    width: "20%",
    flexDirection: "column",
    alignItems: "center",
  },
  subcontainercol2: {
    width: "79%",
    flexDirection: "column",
  },

  upperText: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 25,
    textAlign: "center",
    fontSize: 16,
    color: "#929598",
  },
  mainText: {
    fontSize: 28,
    fontWeight: "600",
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  orderIdText: {
    fontSize: 16,
    alignSelf: "flex-end",
    color: "#929598",
    marginLeft: 10,
  },
  setHr: {
    marginTop: 0,
    width: 1000,
  },
  subcontainercol2Text: {
    marginTop: 5,
    marginLeft: 10,
    color: "#929598",
    fontSize: 16,
  },
  subcontainercol2Text2: {
    marginTop: 30,
    marginLeft: 10,
    color: "#929598",
    fontSize: 16,
  },
  subcontainercol2Text3Heading: {
    marginTop: 30,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  subcontainercol2Text3: {
    marginLeft: 10,
    color: "#929598",
    fontSize: 16,
  },
  subcontainercol2Text4Heading: {
    marginTop: 16,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  subcontainercol2Text5Heading: {
    marginTop: 16,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  nextbutton: {
    backgroundColor: "#084E96",
    width: "30%",
    borderRadius: 6,
    marginTop: 15,
    marginLeft: "34%",
  },
  nextButtonText: {
    textAlign: "center",
    color: "white",
    padding: 10,
  },
});
