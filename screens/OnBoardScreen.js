import { Image, StyleSheet } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";

import Onboarding from "react-native-onboarding-swiper";

class OnBoardScreen extends React.Component {
  render() {
    return (
      <LinearGradient colors={["#ffffff", "#00EDFF"]} style={{ flex: 1 }}>
        <Onboarding
          //bottomBarColor={'black'}
          onDone={() => this.props.navigation.navigate("Registration")}
          onSkip={() => this.props.navigation.navigate("Registration")}
          pages={[
            {
              backgroundColor: "transparent",
              image: (
                <Image
                  style={styles.onBoardLogo}
                  source={require("../assets/order-food.png")}
                />
              ),
              title: "Create Your Order",
              titleStyles: styles.titledesign,
              subTitleStyles: { color: "#929292" },
              subtitle: "Set up delivery date to pick up",
            },
            {
              backgroundColor: "transparent",
              image: (
                <Image
                  style={styles.onBoardLogo}
                  source={require("../assets/delivery-service.png")}
                />
              ),
              titleStyles: styles.titledesign,
              subTitleStyles: { color: "#929292" },
              title: "Hand Over Clothes",
              subtitle: "Our executive will come and collect tour clothes",
            },
            {
              backgroundColor: "transparent",
              image: (
                <Image
                  style={styles.onBoardLogo}
                  source={require("../assets/package.png")}
                />
              ),
              titleStyles: styles.titledesign,
              subTitleStyles: { color: "#929292" },
              title: "Pick Up",
              subtitle: "Our executive will pick up for wash",
            },
          ]}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  onBoardLogo: {
    width: 150,
    height: 150,
  },
  titledesign: {
    color: "black",
    fontWeight: "bold",
  },
});

export default OnBoardScreen;
