import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Text, Checkbox } from "galio-framework";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import easypaisa from "../assets/easypaisa.png";
import jazzcash from "../assets/jazzcash.png";
import ModalScreen from "./ModalScreen";

export default class PaymentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(index, value) {
    this.setState({
      text: `Selected index: ${index} , value: ${value}`,
    });
  }
  render() {
    return (
      
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.radioView}>
          <Text p muted>
            Payment Via
          </Text>
          <View style={styles.subcontainer}>
            <RadioGroup
              onSelect={(index, value) => this.onSelect(index, value)}
            >
              <RadioButton value={"easypaisa"}>
                <Text></Text>
              </RadioButton>

              <RadioButton value={"jazzcash"}>
                <Text></Text>
              </RadioButton>

              <RadioButton value={"Credit Card"}>
                <Text></Text>
              </RadioButton>

              <RadioButton value={"Debit Card"} style={styles.debitradioButton}>
                <Text style={{ fontSize: 20, marginLeft: 8 }}>Debit Card</Text>
              </RadioButton>
            </RadioGroup>

            <View style={styles.imageView}>
              <Image source={easypaisa} />
              <Image source={jazzcash} />
              <Text style={{ marginTop: 6, fontSize: 20 }}>Credit Card</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={{ fontSize: 20 }}>Card Number:</Text>
          <TextInput style={styles.textInput} placeholder="xxxxxxxxxxxxxxxx" />
          <Text style={{ fontSize: 20 }}>Card Holder's Name:</Text>
          <TextInput style={styles.textInput} placeholder="Laundry Wala" />
          <Text style={{ fontSize: 20 }}>CNIC Number:</Text>
          <TextInput style={styles.textInput} placeholder="xxxxx-xxxxxxxx-x" />
        </View>
        <View style={{ alignItems: "center" }}>
          <Checkbox
            color="info"
            style={{ padding: 10 }}
            label="Save my details for future orders"
          />
          <View style={styles.modalBtnView}>
            <ModalScreen></ModalScreen>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingLeft: 20,
    backgroundColor: "white",
    paddingRight: 20,
  },
  radioView: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingBottom: 10,
    alignItems: "flex-start",
  },
  modalBtnView: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: 70,
  },
  textInput: {
    width: "90%",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 0.5,
  },
  inputView: {
    marginTop: 10,
    padding: 10,
  },
  subcontainer: {
    width: "100%",
    height: 120,
    flexDirection: "row",
  },
  imageView: {
    width: "40%",
    height: "100%",
    flexDirection: "column",
  },
  debitradioButton: {
    position: "absolute",
    marginLeft: 180,
    bottom: 0,
    width: 150,
    height: 40,
  },
});
