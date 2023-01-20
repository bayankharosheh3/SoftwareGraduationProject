import { StyleSheet, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import homepageCards from "../assets/data/homepageCards";
import { SIZES } from "../assets/constants";
import { HomeCard, ScreenHeader } from "../Components";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeContainer}>
      <ScreenHeader title={"Home Screen"} desc={"Search Doctors, Clinics"} />
      <FlatList
        data={homepageCards}
        style={styles.cardsContainer}
        contentContainerStyle={{ flex: 1, alignItems: "flex-start" }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <HomeCard card={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  homeContainer: {
    flex: 1,
    position: "relative",
  },
  header: {
    width: "100%",
    height: 0.15 * SIZES.height,
    padding: 30,
    backgroundColor: "#63b885",
    position: "relative",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    marginVertical: 20,
  },
});
