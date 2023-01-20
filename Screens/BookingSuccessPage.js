import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { COLORS } from "../assets/constants";
import { RoutingData } from "../Components/Context/RoutingDataProvider";
import axios from "axios";

const BookingSuccessPage = ({ route, navigation }) => {
  const dataSignIn = useContext(RoutingData);
  console.log(route.params.payment);
  console.log(route.params.doctorId);
  console.log(route.params.appId);
  console.log(dataSignIn.userId);
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  var Data = {
    p_id: dataSignIn.userId,
    method: route.params.payment,
    app_id: route.params.appId,
  };

  const getUsers = () => {
    axios
      .post("http://10.0.2.2:80/backend/book_app.php", Data)
      .then((response) => response.data)
      .then((json) => setUsers(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require("../assets/images/bookingsucessfuly.jpg")}
        style={styles.imgSuccess}
      />
      <Text style={styles.title}>Booking Successful</Text>
      <Text style={styles.desc}>
        Your booking has been Successful, the reminder is set automatically
      </Text>
      <TouchableOpacity>
        <Text style={styles.details}>View Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.gotBtn}
        onPress={() => {
          navigation.navigate("home");
        }}
      >
        <Text style={styles.got}>GOT IT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingSuccessPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    position: "relative",
  },
  imgSuccess: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  desc: {
    fontSize: 16,
    width: "80%",
    textAlign: "center",
    marginBottom: 20,
  },
  details: {
    color: COLORS.Main,
    marginBottom: 150,
  },
  gotBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    backgroundColor: COLORS.Main,
    padding: 15,
    borderRadius: 10,
  },
  got: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
});
