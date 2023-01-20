import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import React from "react";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";
import visa from "./../assets/images/visa.png";
import cash from "./../assets/images/cash.png";

import Visa from "../Components/Visa";
const Bill = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const addTask = (task) => {
    if (task == null) return;
    setTasks([...tasks, task]);
    Keyboard.dismiss();
  };
  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  };
  const [show, setShow] = useState("none");

  const [move, setMove] = useState(false);

  console.log(route.params.doctorId);
  console.log(route.params.appId);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.firstRow}></View>
      <View style={styles.secondRow}></View>
      <View style={styles.column}>
        <View style={styles.info}>
          <View style={styles.infoContainer}>
            <View style={styles.imgView}>
              <Image
                source={require("./../assets/images/1.jpg")}
                style={styles.imgProfile}
              ></Image>
            </View>
            <View style={styles.profileText}>
              <Text style={styles.userName}>$ 100</Text>
              <Text style={styles.age}>Total payment</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabs}>
          <Text style={styles.graytext}>consultation</Text>
          <Text style={styles.paymentdetail}>$10</Text>
        </View>
        <View style={styles.date}>
          <View style={styles.profileText}>
            <Text style={styles.age}>Date</Text>
            <Text style={styles.userName}>20 nov</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.age}>Time</Text>
            <Text style={styles.userName}>5:30 AM</Text>
          </View>
        </View>
        <View style={styles.payment}>
          <Text style={styles.userName}>Payment method</Text>
        </View>

        <TouchableOpacity
          style={styles.paymentbutton}
          activeOpacity={0.5}
          onPress={() => {
            setShow("flex");
            // navigation.navigate("BookingSuccess", {
            //   payment: 1,
            //   appId: route.params.appId,
            //   doctorId: route.params.doctorId,
            // })
          }}
        >
          <Image source={visa} style={styles.visaimg} />
        </TouchableOpacity>

        <View style={styles.paymentview}></View>
        <TouchableOpacity
          style={styles.paymentbutton}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("BookingSuccess", {
              payment: 0,
              appId: route.params.appId,
              doctorId: route.params.doctorId,
            })
          }
        >
          <Image source={cash} style={styles.cashimg} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: show,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <Visa
          fun={setShow}
          setMove={setMove}
          navigation={navigation}
          route={route}
        />
      </View>
    </View>
  );
};

export default Bill;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f9f5",
  },
  date: {
    flex: 0.15,
    width: "100%",
    paddingHorizontal: 19,
    borderBottomColor: "#edf1f7",
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  firstRow: {
    width: "100%",
    flex: 0.4,
    backgroundColor: "#7BC89C",
    alignItems: "center",
  },
  secondRow: {
    width: "100%",
    flex: 0.6,
    // backgroundColor: COLORS.white,
  },
  topContainer: {
    marginTop: 40,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  titleIcons: {
    width: "15%",

    justifyContent: "space-between",
    alignItems: "center",
  },
  titleIcon: {
    fontSize: 20,
    color: "white",
  },
  column: {
    marginTop: 60,
    position: "absolute",
    width: "90%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  info: {
    // backgroundColor: "blue",
    flex: 0.17,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#edf1f7",
    borderBottomWidth: 1,
  },
  infoContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  imgView: {
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  imgProfile: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  userName: {
    fontSize: 22,
    paddingBottom: 2,
  },
  age: {
    fontSize: 16,
    color: "#8f9bb3",
  },

  tabs: {
    flex: 0.065,
    width: "100%",
    paddingHorizontal: 19,
    borderBottomColor: "#edf1f7",
    flexDirection: "row",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },

  tabsContainer: {
    width: "70%",
  },

  tab: {
    justifyContent: "center",
    alignItems: "center",
  },

  iconView: {
    backgroundColor: "#7BC89C",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  iconFile: {
    backgroundColor: "#00a5ff",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconHeart: {
    backgroundColor: "#6574cf",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
    color: "white",
  },
  tabDesc: {
    fontSize: 14,
    color: "#8f9bb3",
  },
  list: {
    // backgroundColor: "red",
    flex: 0.6,
    width: "100%",
  },
  graytext: {
    color: "#8f9bb3",
    fontSize: 17,
  },
  paymentdetail: {
    color: "#7BC89C",
    fontSize: 17,
  },
  payment: {
    flex: 0.065,
    width: "100%",
    padding: 16,
  },
  paymentbutton: {
    flex: 0.2,
    width: "100%",
    paddingHorizontal: 55,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#edf1f7",
  },
  paymentview: {
    flex: 0.05,
    width: "100%",
  },
  visaimg: {
    width: "90%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 19,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#edf1f7",
  },
  cashimg: {
    width: "92%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
});
