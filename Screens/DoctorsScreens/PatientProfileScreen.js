import { React, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from "react-native";
import { COLORS } from "../../assets/constants";
import axios from "axios";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";

import { useEffect } from "react";
import tabs from "../../assets/data/DPatientProfileTabs";

const PatientProfileScreen = ({ navigation, route }) => {
 // console.log(route.params.doctorId);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [patient, setPatient] = useState([]);
  
  console.log(route.params.p_id);
  var Data = {
    p_id: route.params.p_id,
  
  };
  const getPatient = () => {
    axios
      .post("http://10.0.2.2:80/backend/patient_info.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setPatient(json);
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
      <View style={styles.column}>
        <View style={styles.info}>
          <View style={styles.infoContainer}>
            <View style={styles.imgView}>
              <Image
               source={{ uri: patient.p_image }}
                style={styles.imgProfile}
              ></Image>
            </View>
            <View style={styles.profileText}>
              <Text style={styles.userName}>{patient.p_name}</Text>
              <Text style={styles.Specialty}></Text>
            </View>
          
          </View>
        </View>
        <View style={styles.tabs}>
          <View style={styles.tabsContainer}>
            <View style={styles.tab}>
              <View style={styles.someInfoCol}>
                <Text style={styles.someInfo}>{"Phone"}</Text>
              </View>
              <Text style={styles.someInfoDesc}>{patient.p_phone}</Text>
            </View>
            <View style={styles.space}></View>
            <View style={styles.tab}>
              <View style={styles.someInfoCol}>
               
                <Text style={styles.someInfo}>{"Email"}</Text>
              </View>
              <Text style={styles.someInfoDesc}>{patient.p_email}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={tabs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              // onPress={() => {
              //   setShow("flex");
              // }}
              onPress={() => {
                if (item.id == "3") {
                  setModalVisible(!modalVisible);
                } else {
                  navigation.navigate(item.navigateTo, {
                    doctorId: route.params.doctorId,
                    patientId: route.params.p_id,
                  });
                }
              }}
            >
              <View style={styles.listItem}>
                <View style={styles.containerItem}>
                  <View style={styles.itemIconView}>
                    <FontAwesome5Icons name="file" style={styles.itemIcon} />
                  </View>
                  <Text style={styles.itemTitle}>{item.tabName}</Text>
                  <FontAwesome5Icons
                    name="chevron-right"
                    style={styles.itemArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you want delete</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  var Data1 = {
                    p_id: route.params.p_id,
                  };
                  axios
                    .post("http://10.0.2.2:80/backend/doctor/delete_patient.php", Data1)
                    .then((response) => response.data)
                    .then((json) => {console.log(json);
                    })
                    .catch((error) => console.error(error))
                    .finally(() => setLoading(false));



                  console.log("hhhh")
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default PatientProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  column: {
    marginTop: 120,
    width: "90%",
    flex: 0.5,
  },
  info: {
    flex: 0.8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#edf1f7",
    borderBottomWidth: 1,
  },
  infoContainer: {
    width: "90%",
    alignItems: "center",
  },
  imgView: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  imgProfile: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    marginBottom: 2,
    textTransform: "capitalize",
    textAlign: "center",
  },
  Specialty: {
    fontSize: 16,
    color: "#8f9bb3",
    textTransform: "capitalize",
    textAlign: "center",
  },
  rateView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  starIcon: {
    width: 20,
    height: 20,
    paddingRight: 10,
  },
  rateValue: {
    fontSize: 20,
    color: COLORS.Main,
    paddingRight: 3,
  },
  rateCount: {
    color: "#8f9bb3",
  },
  tabs: {
    flex: 0.2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#edf1f7",
    borderBottomWidth: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    padding: 20,
  },
  space: {
    borderRightColor: "#edf1f7",
    borderRightWidth: 2,
    height: "100%",
  },
  someInfoCol: {
    flexDirection: "row",
  },
  someInfo: {
    paddingLeft: 10,
  },
  someInfoDesc: {
    color: "#8f9bb3",
  },
  list: {
    paddingTop: 7,

    backgroundColor: "#edf1f7",
    flex: 0.5,
    width: "100%",
  },
  listItem: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#edf1f7",
    borderBottomWidth: 1,
    height: 70,
    marginBottom: 5,
    marginTop: 10,
  },
  containerItem: {
    width: "90%",
    backgroundColor: "white",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemIconView: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
    backgroundColor: "white",
    borderRightColor: "#edf1f7",
    borderRightWidth: 1,
  },
  itemIcon: {
    fontSize: 20,
    color: COLORS.Main,
    lineHeight: 50,
    textAlign: "center",
  },
  itemTitle: {
    flex: 0.9,
    // backgroundColor: "blue",
    fontSize: 16,
  },
  itemArrow: {
    paddingRight: 10,
    fontSize: 16,
    color: "#8f9bb3",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "80%",
    marginLeft:'20%',

    // backgroundColor:'red'
    position: "absolute",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 200,
    height: 200,
    paddingTop: 35,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 80,
    marginTop: 25,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
});
