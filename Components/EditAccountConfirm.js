import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../assets/constants";
import { useState } from "react";

const EditAccountConfirm = ({ fun, setMove }) => {
  const [toEdit, setToEdit] = useState({
    email: null,
    password: null,
  });

  return (
    <View style={styles.container}>
      <View style={styles.confirmMassage}>
        <View style={styles.innerContainer}>
          <Text style={styles.emailLabel}>EMAIL</Text>
          <TextInput
            placeholder={"Email"}
            style={styles.emailInput}
            value={toEdit.email}
            onChangeText={(text) => {
              setToEdit({ ...toEdit, email: text });
            }}
          />
          <Text style={styles.passwordLabel}>PASSWORD</Text>
          <TextInput
            placeholder={"Password"}
            style={styles.passwordInput}
            value={toEdit.password}
            onChangeText={(text) => {
              setToEdit({ ...toEdit, password: text });
            }}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {
              if ((toEdit.email == "bayan") & (toEdit.password == "1234")) {
                // if email & password correct setMove(true)
                setMove(true);
                fun("none");
              } else {
                console.log("try again");
                setMove(false);
                fun("none");
              }
            }}
          >
            <Text style={styles.logoutBtnText}>confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              setToEdit({ ...toEdit, email: "", password: "" });
              fun("none");
              setMove(false);
            }}
          >
            <Text style={styles.cancelBtnText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditAccountConfirm;

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
    // flex: 0.8,
    width: "90%",
    height: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "80%",
    alignItems: "center",
  },
  emailLabel: {
    color: "#8f9bb3",
    width: "100%",
    marginBottom: 10,
    fontSize: 14,
  },
  passwordLabel: {
    fontSize: 14,
    color: "#8f9bb3",
    width: "100%",
    marginBottom: 10,
  },
  emailInput: {
    width: "100%",
    padding: 10,
    backgroundColor: "#f7f9fc",
    borderColor: "#edf1f7",
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 20,
  },
  passwordInput: {
    width: "100%",
    padding: 10,
    backgroundColor: "#f7f9fc",
    borderColor: "#edf1f7",
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 50,
  },
  cancelBtn: {
    width: "100%",
    borderColor: COLORS.Main,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutBtn: {
    width: "100%",
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
    fontSize: 14,
    textTransform: "uppercase",
    color: COLORS.Main,
  },
});
