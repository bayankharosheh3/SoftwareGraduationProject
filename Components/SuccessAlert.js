import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../assets/constants";

const SuccessAlert = ({ fun }) => {
  return (
    <View style={styles.container}>
      <View style={styles.confirmMassage}>
        <Image
          style={styles.imgLogout}
          source={require("../assets/images/success.jpg")}
        ></Image>
        <View style={styles.text}>
          <Text style={styles.logoutWord}>Success!</Text>
          <Text style={styles.question}>The password is changed</Text>
        </View>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => {
            fun("none");
          }}
        >
          <Text style={styles.cancelBtnText}>GOT IT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessAlert;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#00000070",
    alignItems: "center",
    paddingTop: 120,
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
    backgroundColor: COLORS.Main,
    borderColor: COLORS.Main,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutBtnText: {
    fontSize: 14,
    textTransform: "uppercase",
    color: "white",
  },
  cancelBtnText: {
    color: "white",
  },
});
