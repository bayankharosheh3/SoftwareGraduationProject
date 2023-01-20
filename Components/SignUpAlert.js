import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../assets/constants";

const SignUpAlert = ({ fun, fun2, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.confirmMassage}>
        <Image
          style={styles.imgLogout}
          source={require("../assets/images/logout.jpg")}
        ></Image>
        <View style={styles.text}>
          <Text style={styles.logoutWord}>Your Information Saved</Text>
          <Text style={styles.question}>log in please!</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            fun(false);
            fun2({
              name: "",
              email: "",
              phone: "",
              password: "",
            });
            navigation.replace("SignInScreen");
          }}
        >
          <Text style={styles.logoutBtnText}>got it</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpAlert;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#00000070",
    alignItems: "center",
    paddingTop: 140,
  },
  confirmMassage: {
    backgroundColor: "white",
    flex: 0.8,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  imgLogout: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },

  text: {
    flex: 0.3,
    alignItems: "center",
    marginBottom: 60,
  },
  logoutWord: {
    fontSize: 24,
    marginBottom: 10,
  },
  cancelBtn: {
    width: "80%",
    borderColor: COLORS.Main,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutBtn: {
    width: "80%",
    backgroundColor: COLORS.Main,
    borderColor: COLORS.Main,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  logoutBtnText: {
    fontSize: 14,
    textTransform: "uppercase",
    color: "white",
  },
  cancelBtnText: {
    color: COLORS.Main,
  },
});
