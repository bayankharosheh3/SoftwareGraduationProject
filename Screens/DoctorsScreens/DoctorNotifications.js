import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import messages from "../../assets/data/messages";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { RoutingData } from "../../Components/Context/RoutingDataProvider";

import axios from "axios";
const DoctorNotifications = () => {

  const dataSignIn = useContext(RoutingData);
  console.log(dataSignIn.userId);
  var Data = {
    id: dataSignIn.userId,
  };
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers1 = () => {
    axios
    .post("http://10.0.2.2:80/backend/doctor/notification.php",Data)
    .then((response) => response.data)
    .then((json) => {
      setUsers(json);
    console.log(users);})
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  };
    useEffect(() => {
      setLoading(true);
      getUsers1();
    }, []);


  return (
    <View>
      <FlatList
        style={styles.list}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.Notification}>
              <View style={styles.Container}>
                <Text style={styles.notificationTitle}>canceled appointment</Text>
                <Text style={styles.notificationDesc}>
                your appointment at {item.time} on {item.date} with doctor {item.name} had been canceled.
                 </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DoctorNotifications;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "white",
  },
  Notification: {
    height: 100,
    // backgroundColor: "pink",
    borderBottomColor: "#edf1f7",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  Container: {
    height: "100%",
    width: "90%",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  notificationTitle: {
    fontSize: 16,
  },
  notificationDesc: {
    fontSize: 14,
    color: "#8f9bb3",
  },
});
