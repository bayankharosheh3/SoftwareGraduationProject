import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { COLORS } from "../../assets/constants";
import axios from "axios";
const DoctorLabResult = ({ navigation, route }) => {
  console.log(route.params.id);
  const [isLoading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState([]);
  var Data = {
    id:route.params.id,
   
  };
  const getPatient = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor/lab_result.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setDoctor(json);
        console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getPatient();
  }, []);


  return (
    <View style={styles.mainContainer}>
      <View style={styles.firstRow}></View>
      <View style={styles.secondRow}></View>
      <View style={styles.column}>
        <View style={styles.resultCont}>{/* result img*/}</View>
        <View style={styles.info}>
          <View style={styles.row1}>
            <View style={styles.row2}>
              <Text style={styles.title}>Title:</Text>
              <Text style={styles.title2}>{doctor.title}</Text>
            </View>
            <View style={styles.row2}>
              <Text style={styles.title}>To:</Text>
              <Text style={styles.title2}>doctor name</Text>
            </View>
          </View>
          <View style={styles.row1}>
            <View style={styles.row2}>
              <Text style={styles.title}>Patient Name:</Text>
              <Text style={styles.title2}>{doctor.name}</Text>
            </View>
            <View style={styles.row2}>
            
            </View>
          </View>
        </View>
        <View style={styles.info}>
          <View style={[styles.row1, { justifyContent: "flex-start" }]}>
            <Text style={styles.title}>Note:</Text>
            <Text style={styles.title2}>{doctor.message}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoctorLabResult;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    // justifyContent: "center",
    alignItems: "center",
  },
  firstRow: {
    width: "100%",
    flex: 0.5,
    backgroundColor: COLORS.Main,
    alignItems: "center",
  },
  secondRow: {
    width: "100%",
    flex: 0.5,
    // backgroundColor: COLORS.white,
  },
  topContainer: {
    marginTop: 60,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  column: {
    marginTop: 120,
    position: "absolute",
    width: "90%",
    height: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
  },
  resultCont: {
    flex: 0.6,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#edf1f7",
    borderBottomWidth: 1,
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

  imgView: {
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  row1: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  title: {
    paddingRight: 10,
    fontSize: 18,
    color: COLORS.Main,
  },
  title2: {
    fontSize: 16,
    color: COLORS.black,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
