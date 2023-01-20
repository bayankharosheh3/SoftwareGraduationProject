import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

import { Calendar } from "react-native-calendars";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { RoutingData } from "../../Components/Context/RoutingDataProvider";

import { COLORS } from "../../assets/constants";
import { Card, Avatar } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRef } from "react";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
const DoctorSchedule = ({ navigation, route }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [appointments, setAppointments] = useState([]);
  // const [filtered, setFiltered] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const id = useRef(0);
  const filtered = appointments.filter((appointment) => {
    return appointment.day === selectedDay;
  });
  const dataSignIn = useContext(RoutingData);
  console.log(dataSignIn.userId);
  var Data = {
    id: dataSignIn.userId,
  };
  console.log(appointments);
  const getAppointments = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor/doctor_app.php", Data)
      .then((response) => response.data)
      .then((json) => setAppointments(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    getAppointments();
  }, []);

  const date = new Date();
  const mode = "time";
  const [show, setShow] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [edit, setEdit] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    // setDate(currentDate);

    let temp = new Date(currentDate);
    let time = temp.getHours() + ":" + temp.getMinutes() + ":00";
    if (edit !== null) {
      const objIndex = appointments.findIndex((obj) => obj.id == edit);
      appointments[objIndex].hour = time;
      setEdit(null);
    } else {
      setAppointments([
        ...appointments,
        {
          id: id.current++,
          day: selectedDay,
          hour: time,
          hours: temp.getHours(),
          min: dataSignIn.userId,
        },
      ]);
    }

    // console.log(temp.getMinutes());
  };
  // console.log(appointments);

  //custom
  var customMarkedDate = {};

  var coloredDay = [selectedDay];

  appointments.map((appointment) => {
    coloredDay = [...coloredDay, appointment.day];
  });

  coloredDay.map((day) => {
    if (day == selectedDay) {
      customMarkedDate[day] = {
        selected: true,
        selectedColor: COLORS.Main,
      };
    } else {
      customMarkedDate[day] = {
        selected: true,
        selectedColor: COLORS.Main,
      };
    }
  });

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;

  const start =
    currentDate.getFullYear() + "-" + month + "-" + currentDate.getDate();

  // console.log(start);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>select the preferred day ...</Text>
      <View>
        <Calendar
          style={{
            borderRadius: 10,
            elevation: 4,
            marginVertical: 20,
            width: "100%",
          }}
          onDayPress={(date) => {
            setSelectedDay(date.dateString);
            //  console.log(date.dateString);
          }}
          markingType={"custom"}
          minDate={new Date()}
          hideExtraDays={true}
          markedDates={{
            [start]: {
              selectedColor: COLORS.white,
              selectedTextColor: COLORS.black,
            },
            ...customMarkedDate,
          }}
        />
      </View>
      {selectedDay && (
        <View style={styles.btnCont}>
          <TouchableOpacity
            style={[{ marginRight: 10, marginTop: -6 }]}
            onPress={() => {
              setShow(true);
              console.log(true);
            }}
          >
            <Card style={{ backgroundColor: COLORS.Main }}>
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>Add</Text>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginRight: 10,
              marginTop: -6,
            }}
            onPress={() => {
              const newArray = appointments.filter(
                (appointment) => appointment.day !== selectedDay
              );
              setAppointments(newArray);
              // console.log(appointments);
            }}
          >
            <Card>
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>Delete</Text>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{ marginRight: 10, marginTop: -6 }]}
            onPress={() => {
              // console.log(appointments);
              axios
                .post(
                  "http://10.0.2.2:80/backend/doctor/schedule.php",
                  appointments
                )
                .then((response) => response.data)
                .then((json) => {
                  setUsers(json);
                  console.log(json);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
            }}
          >
            <Card style={{ backgroundColor: COLORS.Main }}>
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>Save changes</Text>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      )}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date1}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <FlatList
        style={{ flex: 1 }}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Card style={{ marginRight: 10, marginTop: 10 }}>
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>{item.hour}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => {
                        const newArray = appointments.filter(
                          (appointment) => appointment.id !== item.id
                        );
                        setAppointments(newArray);
                        console.log(item.id);
                        var Data = {
                          id: item.id,
                        };
                        axios
                          .post(
                            "http://10.0.2.2:80/backend/doctor/delete_app.php",
                            Data
                          )
                          .then((response) => response.data)
                          .then((json) => {
                            setUsers(json);
                            console.log(json);
                          })
                          .catch((error) => console.error(error))
                          .finally(() => setLoading(false));
                      }}
                      style={{ marginRight: 12 }}
                    >
                      <MaterialIcons
                        style={styles.delete}
                        name="delete"
                        size={24}
                        color={COLORS.Main}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setDate1(
                          new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDay(),
                            item.hours,
                            item.min
                          )
                        );
                        // console.log("kk");
                        console.log(date1);
                        setEdit(item.id);
                        setShow(true);
                      }}
                    >
                      <FontAwesome5Icons
                        name={"pen"}
                        size={17}
                        style={{ color: COLORS.Main }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
        )}
      />
    </View>
  );
};

export default DoctorSchedule;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: "5%",
    paddingBottom: "10%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  btnCont: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",

    // margin: 10,
  },
  btn: {
    backgroundColor: COLORS.Main,
    borderRadius: 7,
    padding: 20,
    paddingVertical: 14,
    width: "35%",
  },
  txt: {
    color: COLORS.white,
    fontSize: 16,
    textTransform: "uppercase",
    paddingRight: 10,
    textAlign: "center",
  },
  nextbtn: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    padding: 20,
    paddingVertical: 14,
    borderColor: COLORS.Main,
    borderWidth: 1,
    width: "35%",
  },
  nextcontainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nexttxt: {
    color: COLORS.Main,
    fontSize: 16,
    textTransform: "uppercase",
    paddingRight: 13,
  },
  arrow: {
    borderColor: COLORS.Main,
    borderWidth: 2,
    borderRadius: 100,
    padding: 2,
  },
  nextCont: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  chosen: {
    justifyContent: "space-between",
  },
  txtchosen: {
    // textAlign:'left',
    color: COLORS.Main,
    fontSize: 16,
    fontWeight: "600",
  },
});
