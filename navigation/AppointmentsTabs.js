import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Past, Upcoming } from "../Screens/AppointmentsScreen";

const Tab = createMaterialTopTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Upcoming"
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen
        name="Upcoming"
        component={Upcoming}
        options={{ tabBarLabel: "Upcoming" }}
      />

      <Tab.Screen
        name="Past"
        component={Past}
        options={{ tabBarLabel: "Past" }}
      />
    </Tab.Navigator>
  );
}
