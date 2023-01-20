import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllDoctors from "../Components/AllDoctors";
import MyDoctors from "../Components/MyDoctors";
import React from "react";

const Tab = createMaterialTopTabNavigator();

function MyTabs({
  navigation,
  searchPhrase,
  setSearchPhrase,
  clicked,
  setClicked,
}) {
  return (
    <Tab.Navigator
      initialRouteName="allDoctors"
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen
        name="allDoctors"
        component={AllDoctors}
        options={{ tabBarLabel: "All Doctors" }}
        initialParams={{
          searchPhrase: searchPhrase,
          setSearchPhrase: setSearchPhrase,
          clicked: clicked,
          setClicked: setClicked,
          navigation: navigation,
        }}
      />

      <Tab.Screen
        name="myDoctors"
        component={MyDoctors}
        options={{ tabBarLabel: "My doctors" }}
        initialParams={{
          searchPhrase: searchPhrase,
          setSearchPhrase: setSearchPhrase,
          clicked: clicked,
          setClicked: setClicked,
          navigation: navigation,
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
