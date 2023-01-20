import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { COLORS } from "../../assets/constants";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
const DoctorPatientHistory = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [smoke, setSmoke] = useState([]);
  const [familyd, setFamilyd] = useState([]);
  const [chronic, setChronic] = useState([]);
  const [medication, setMedication] = useState([]);

  console.log(route.params.patientId);
  var Data = {
    p_id:route.params.patientId,
   
  };
  const getPatient = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor/past_sergries.php", Data)
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
  
  const getPatient1 = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor/chronic.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setChronic(json);
        console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getPatient1();
  }, []);
  
  const getPatient2 = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor/midecation.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setMedication(json);
        console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getPatient2();
  }, []);
  

  const getPatient3 = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor/family_d.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setFamilyd(json);
        console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getPatient3();
  }, []);
  

  const getPatient4 = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor/smoking.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setSmoke(json);
        console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getPatient4();
  }, []);
  


  return (
    <View style={styles.main}>
      <View style={styles.firstRow}></View>
      <View style={styles.secondRow}></View>
      <View style={styles.column}>
      <View style={styles.rowContainer}>
                  <Text style={styles.label}>past surgeries & hospitalizations:</Text>
                </View>
        <FlatList
          data={doctor}
          keyExtractor={(item) => item.id}
          style={styles.rowContainer1}
          renderItem={({ item }) => {
            return (
                  <Text>
                  {item.sergeries}
                  </Text>
              
          
            );
          }}
        />
<View style={styles.rowContainer}>
                  <Text style={styles.label}>chronic diseases:</Text>
                </View>
        <FlatList
          data={chronic}
          keyExtractor={(item) => item.id}
          style={styles.rowContainer1}
          renderItem={({ item }) => {
            return (
                  <Text>
                  {item.cronic}
                  </Text>
              
          
            );
          }}
        />

<View style={styles.rowContainer}>
                  <Text style={styles.label}>medication</Text>
                </View>
        <FlatList
          data={medication}
          keyExtractor={(item) => item.id}
          style={styles.rowContainer1}
          renderItem={({ item }) => {
            return (
                  <Text>
                  {item.medication}
                  </Text>
              
          
            );
          }}
        />
        <View style={styles.rowContainer}>
                  <Text style={styles.label}>smoking</Text>
                </View>
                <Text style={styles.rowContainer1}>{smoke}</Text>
        <View style={styles.rowContainer}>
                  <Text style={styles.label}>diseases or medical problems that run in family:</Text>
                </View>
        <FlatList
          data={familyd}
          keyExtractor={(item) => item.id}
          style={styles.rowContainer1}
          renderItem={({ item }) => {
            return (
                  <Text>
                  {item.diseas}
                  </Text>
              
          
            );
          }}
        />

      </View>
    </View>
  );
};

export default DoctorPatientHistory;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  firstRow: {
    width: "100%",
    flex: 0.4,
    backgroundColor: COLORS.Main,
    alignItems: "center",
  },
  secondRow: {
    width: "100%",
    flex: 0.6,
    // backgroundColor: COLORS.white,
  },
  column: {
    marginTop: 100,
    position: "absolute",
    width: "90%",
    height: "84%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
  },
  row: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#edf1f7",
    borderBottomWidth: 1,
  },
  rowContainer: {
    // backgroundColor: "blue",
   // flexDirection: "row",
   // alignItems: "center",
    // justifyContent: "space-between",
    width: "90%",
    paddingBottom: 10,
    borderBottomColor: "#8f9bb3",
    borderBottomWidth: 1,
  },
  rowContainer1: {
    // backgroundColor: "blue",
   // flexDirection: "row",
   // alignItems: "center",
    // justifyContent: "space-between",
    width: "90%",
    paddingBottom: 10,
    paddingLeft:9,
   
    
  },
  row2Container: {
    width: "90%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  label: {
    // width: "40%",
    textTransform: "capitalize",
    fontSize: 14,
    color: "#8f9bb3",
    paddingRight: 10,
  },
  label2: {
    width: "60%",
    // backgroundColor: "red",
    overflow: "hidden",
    height: 20,
  },
});
