import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableHighlight,
  Alert,
} from "react-native";
import detail from "../assets/detail.png";

export default class ModalScreen extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.firstcontainer}>
                <View>
                  <Image source={detail} style={styles.imageView} />
                </View>
                <Text style={styles.modalText}>
                  Order{"\n"}successfully{"\n"}placed
                </Text>
              </View>
              <Text style={styles.modalText2}>Name: Ahsan Ali</Text>
              <Text style={styles.modalText2}>Order#: 123456789</Text>
              <TouchableHighlight
                style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Check Order Status</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Exit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Confirm</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalText: {
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 17,
    textAlign: "left",
  },
  modalText2: {
    fontSize: 20,
    textAlign: "left",
  },
  firstcontainer: {
    flexDirection: "row",
    height: 100,
    width: 100,
  },
  imageView: {
    height: 100,
    width: 100,
  },
});
