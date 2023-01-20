import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../assets/constants";

const NextButton = ({ scrollTo }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.btn}
        activeOpacity={0.6}
      >
        <View style={styles.container}>
          <Text style={styles.txt}>next</Text>
          <View style={styles.arrow}>
            <AntDesign
              name="arrowright"
              size={12}
              color={COLORS.FontColorWithBackground}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.Main,
    borderRadius: 7,
    padding: 20,
    paddingVertical: 14,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: COLORS.white,
    fontSize: 16,
    textTransform: "uppercase",
    paddingRight: 10,
  },
  arrow: {
    borderColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 100,
    padding: 2,
  },
});
