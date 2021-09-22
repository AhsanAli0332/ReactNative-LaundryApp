import React, { useState, useRef } from "react";
import {
  View,
  Button,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import Hr from "react-native-hr-component";
import RBSheet from "react-native-raw-bottom-sheet";
import OrderDetail from "./OrderDetail";

const DateTime = () => {
  /*For pick up Time Date setup*/

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const [time, setTime] = useState(new Date());
  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedValue || date;
      setDate(currentDate);
      setMode("time");
    } else {
      const selectedTime = selectedValue || time;
      setTime(selectedTime);
      setShow(Platform.OS === "ios");
      setMode("date");
    }
  };

  /*For Delivery Time Date setup*/

  const [date2, setDate2] = useState(new Date());
  const [mode2, setMode2] = useState("date");
  const [show2, setShow2] = useState(false);

  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker2 = () => {
    showMode2("date");
  };

  const showTimepicker2 = () => {
    showMode2("time");
  };

  const [time2, setTime2] = useState(new Date());
  const onChange2 = (event, selectedValue) => {
    setShow2(Platform.OS === "ios");
    if (mode2 == "date") {
      const currentDate = selectedValue || date2;
      setDate2(currentDate);
      setMode2("time");
    } else {
      const selectedTime = selectedValue || time2;
      setTime2(selectedTime);
      setShow2(Platform.OS === "ios");
      setMode2("date");
    }
  };
  const [country, setCountry] = useState(0);
  const refRBSheet = useRef();

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>Set a Pick Up time and date</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.dateView}>
          <TouchableOpacity style={styles.datebutton} onPress={showDatepicker}>
            <Text style={styles.dateButtonText}>Set Date</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeView}>
          <TouchableOpacity style={styles.timebutton} onPress={showTimepicker}>
            <Text style={styles.timeButtonText}>Set Time</Text>
          </TouchableOpacity>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.displayDate}>
          {date.getDate()}-{date.getMonth()}-{date.getFullYear()}
        </Text>
        <Text style={styles.displayTime}>
          {time.getHours()}:{time.getMinutes()}{" "}
        </Text>
        <DropDownPicker
          items={[
            { label: "am", value: "am" },
            { label: "pm", value: "pm" },
          ]}
          defaultValue={"am"}
          containerStyle={{ height: 40, width: 65, marginTop: 20 }}
          style={{ borderWidth: 0 }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setCountry(item.value)}
        />
      </View>

      <Hr lineColor="#eee" width={1} text="" hrStyles={styles.setHr} />

      <Text style={styles.mainHeading}>Set a Delivery time and date</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.dateView}>
          <TouchableOpacity style={styles.datebutton} onPress={showDatepicker2}>
            <Text style={styles.dateButtonText}>Set Date</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeView}>
          <TouchableOpacity style={styles.timebutton} onPress={showTimepicker2}>
            <Text style={styles.timeButtonText}>Set Time</Text>
          </TouchableOpacity>
        </View>
      </View>
      {show2 && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date2}
          mode={mode2}
          is24Hour={true}
          display="default"
          onChange={onChange2}
        />
      )}
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.displayDate}>
          {date2.getDate()}-{date2.getMonth()}-{date2.getFullYear()}
        </Text>
        <Text style={styles.displayTime}>
          {time2.getHours()}:{time2.getMinutes()}{" "}
        </Text>
        <DropDownPicker
          items={[
            { label: "am", value: "am" },
            { label: "pm", value: "pm" },
          ]}
          defaultValue={"am"}
          containerStyle={{ height: 40, width: 65, marginTop: 20 }}
          style={{ borderWidth: 0 }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setCountry(item.value)}
        />
      </View>

      <TouchableOpacity
        style={styles.nextbutton}
        onPress={() => refRBSheet.current.open()}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={600}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <OrderDetail></OrderDetail>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  mainHeading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  dateView: {
    width: "40%",
    height: 40,
    marginLeft: "7%",
    marginTop: 15,
  },
  datebutton: {
    backgroundColor: "#084E96",
    width: "90%",
    borderRadius: 6,
  },
  dateButtonText: {
    textAlign: "center",
    color: "white",
    padding: 10,
  },
  timeView: {
    width: "40%",
    height: 40,
    marginTop: 15,
    marginLeft: "10%",
  },
  timebutton: {
    backgroundColor: "#084E96",
    width: "90%",
    borderRadius: 6,
  },
  timeButtonText: {
    textAlign: "center",
    color: "white",
    padding: 10,
  },
  displayDate: {
    marginTop: 20,
    padding: 10,
    borderColor: "#7D7D7D",
    borderWidth: 1,
    borderRadius: 6,
    width: "35%",
    textAlign: "center",
    marginLeft: "7%",
    color: "#7D7D7D",
  },

  displayTime: {
    marginTop: 20,
    padding: 10,
    borderColor: "#7D7D7D",
    borderWidth: 1,
    borderRadius: 6,
    width: "18%",
    textAlign: "center",
    marginLeft: "15%",
    color: "#7D7D7D",
  },

  customStylesHere: {
    color: "#eee",
  },
  setHr: {
    marginTop: 20,
    width: 1000,
  },
  nextbutton: {
    backgroundColor: "#084E96",
    width: "30%",
    borderRadius: 6,
    marginTop: 25,
    marginLeft: "34%",
  },
  nextButtonText: {
    textAlign: "center",
    color: "white",
    padding: 10,
  },
});

export default DateTime;
