import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../assets/constants";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import tabs from "../assets/data/PdoctorProfileTabs";
import { useState, useEffect } from "react";
import axios from "axios";

const DoctorProfileScreen = ({ navigation, route }) => {
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [review, setReview] = useState([]);
  const [isLoadingr, setLoadingr] = useState(false);
  var Data = {
    id: route.params.doctorId,
  };

  const getReview = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctors_review.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setReview(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingr(false));
  };
  useEffect(() => {
    setLoadingr(true);
    getReview();
  }, []);

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

  console.log(route.params.doctorId);

  return (
    <View style={styles.mainContainer}>
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
              <Text style={styles.userName}>{doctor.name}</Text>
            </View>
            <View style={styles.rateView}>
              <Image
                source={require("./../assets/images/star.png")}
                style={styles.starIcon}
              />
              <Text style={styles.rateValue}>{review.avg}</Text>
              <Text style={styles.rateCount}>({review.count} reviews)</Text>
            </View>
          </View>
        </View>
        <View style={styles.tabs}>
          <View style={styles.tabsContainer}>
            <View style={styles.someInfoCol}>
              <Text style={styles.someInfo}>phone number : </Text>
            </View>
            <Text style={styles.someInfoDesc}>{doctor.phone}</Text>
          </View>
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={tabs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(item.navigateTo, {
                  doctorId: route.params.doctorId,
                })
              }
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
    </View>
  );
};

export default DoctorProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    alignItems: "center",
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
    width: "65%",
    justifyContent: "center",
    paddingTop: 5,
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
    fontSize: 16,
  },
  itemArrow: {
    paddingRight: 10,
    fontSize: 16,
    color: "#8f9bb3",
  },
});
