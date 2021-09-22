import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Logo from "../assets/logo.png";
import LinearGradient from "react-native-linear-gradient";

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.navigate("OnBoard");
    }, 5000);
  }
  render() {
    return (
      <LinearGradient colors={["#ffffff", "#00EDFF"]} style={styles.container}>
        <View style={styles.container}>
          <View>
            <Image source={Logo} style={styles.image} />
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.h2}>Welcome to</Text>
            <Text style={styles.h1}>Laundary wala</Text>
          </View>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    color: "#ffa600",
    textShadowColor: "#660014",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10,
    fontSize: 40,
  },
  h2: {
    color: "#929292",
    fontSize: 25,
    marginTop: 8,
  },
  image: {
    width: 300,
    height: 260,
  },
  middleContainer: {
    alignItems: "center",
  },
});
