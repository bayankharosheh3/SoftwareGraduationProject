import { COLORS, SIZES } from "../assets/constants";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput } from "react-native-gesture-handler";

const ScreenHeader = ({ title, desc = "Search" }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.searchContainer}>
        <TextInput placeholder={desc} style={{ flex: 1 }} />
        <FontAwesome5Icon
          name="search"
          size={20}
          style={{ marginHorizontal: 10 , color:COLORS.FontColorWithBackground}}
        />
      </View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "flex-end",
    flex: 0.3,
    height: 0.17 * SIZES.height,
    padding: 30,
    backgroundColor: COLORS.Main,
    position: "relative",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  searchContainer: {
    padding: 5,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#95d3af",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.Background,
    alignItems: "center",
    // backgroundColor: COLORS.InputBackground,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "flex-start",
    // height: 50,
    // borderRadius: 5,
    // backgroundColor: "white",
    marginVertical: 15,
    paddingLeft: 15,
  },
});
