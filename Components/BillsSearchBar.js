import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const BillsSearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setCLicked,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          color="white"
        />
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="white"
          style={{ marginRight: 7 }}
        />

        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
    </View>
  );
};
export default BillsSearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 5,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#95d3af",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBar__clicked: {
    padding: 5,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#D7EEE1",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
  },
});
