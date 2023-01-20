import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { ScreenHeader } from "../Components";
import axios from "axios";
import { RoutingData } from "../Components/Context/RoutingDataProvider";


const MessagesScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const dataSignIn = useContext(RoutingData);
  console.log(dataSignIn.userId);
  var Data = {
    p_id: dataSignIn.userId,
  };
  const getUsers = () => {
    axios
      .post("http://10.0.2.2:80/backend/my_doctors.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setUsers(json);
        console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScreenHeader title={"Chat"} />
      <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.dr_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Chat", { userName: item.dr_name,
                  id: item.dr_id,
                })
              }
            >
              <View style={styles.userInfo}>
                <View style={styles.userImgWrapper}>
                  <Image style={styles.userImg} source={{ uri: item.image }} />
                </View>
                <View style={styles.textSection}>
                  <View style={styles.userInfoText}>
                    <Text style={styles.userName}>{item.dr_name}</Text>
                    <Text style={styles.postTime}>{item.messageTime}</Text>
                  </View>
                  <Text style={styles.messageText}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  card: {
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  userInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postTime: {
    fontSize: 12,
    color: "#666",
  },
  messageText: {
    fontSize: 14,
    color: "#333333",
  },
});
