import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../assets/constants";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import messages from "../../assets/data/DProfiledata";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { RoutingData } from "../../Components/Context/RoutingDataProvider";
import axios from "axios";
import DChangePassword from "../../Components/DoctorComponents/DChangePassword";
import DBill from "../../Components/DoctorComponents/DBill";

const DoctorProfile = ({ route, navigation }) => {
  const [show, setShow] = useState("none");
  const [show2, setShow2] = useState("none");
  const [move, setMove] = useState(false);
  const dataSignIn = useContext(RoutingData);
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setLoading] = useState(false);
  console.log(dataSignIn.userId);

  var Data = {
    id: dataSignIn.userId,
  };
  const getDoctor = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor_info.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setDoctor(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getDoctor();
  }, []);
  // console.log(navigation.navigate('Notifications'))
  return (
    <View style={styles.mainContainer}>
      <View style={styles.firstRow}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Profile</Text>

          <View style={styles.titleIcons}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Announcements")}
            >
              <FontAwesome5Icons name="bell" style={styles.titleIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Supporting")}>
              <FontAwesome5Icons name="cog" style={styles.titleIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.secondRow}></View>
      <View style={styles.column}>
        <View style={styles.info}>
          <View style={styles.infoContainer}>
            <View style={styles.imgView}>
              <Image
                source={{ uri: doctor.image }}
                style={styles.imgProfile}
              ></Image>
            </View>
            <View style={styles.profileText}>
              <Text style={styles.userName}>Dr.{doctor.name}</Text>
              <Text style={styles.age}>{doctor.speciality}</Text>
            </View>
          </View>
        </View>
        <View style={styles.tabs}>
          <View style={styles.tabsContainer}>
            <View style={styles.tab}>
              <View style={styles.iconView}>
                <FontAwesome5Icons name="user" style={styles.icon} />
              </View>
            </View>
            <View style={styles.tab}>
              <View style={styles.iconFile}>
                <FontAwesome5Icons name="file" style={styles.icon} />
              </View>
            </View>
            <View style={styles.tab}>
              <View style={styles.iconHeart}>
                <FontAwesome5Icons name="heart" style={styles.icon} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.list}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                // onPress={() => {
                //   setShow("flex");
                // }}
                onPress={() => {
                  if (item.id === "1" || item.id === "2") {
                    navigation.navigate(item.navigator);
                  } else if (item.id === "3") {
                    setShow("flex");
                  } else if (item.id === "4") {
                    setShow2("flex");
                  } else if (item.id === "5") {
                    dataSignIn.setLoggedIn(false);
                    dataSignIn.setLoggedInAs("");
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
              //   <View>
              //     <Text>{item.userName}</Text>
              //   </View>
            )}
          />
        </View>
      </View>
      <View
        style={{
          display: show,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <DChangePassword fun={setShow} />
        <DBill fun={setShow2} />
      </View>
      <View
        style={{
          display: show2,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <DBill fun={setShow2} />
      </View>
    </View>
  );
};

export default DoctorProfile;

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
    flex: 0.4,
    backgroundColor: COLORS.Main,
    alignItems: "center",
  },
  secondRow: {
    width: "100%",
    flex: 0.6,
    // backgroundColor: COLORS.white,
  },
  topContainer: {
    marginTop: 60,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleIcon: {
    fontSize: 20,
    color: "white",
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
  },

  iconView: {
    backgroundColor: COLORS.Main,
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
  listItem: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#edf1f7",
    borderBottomWidth: 1,
    height: 80,
  },
  containerItem: {
    width: "90%",
    // backgroundColor: "pink",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemIconView: {
    // flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    width: 50,
    height: 50,
    backgroundColor: "#f3f4fb",
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
    fontSize: 16,
    color: "#8f9bb3",
  },
});
