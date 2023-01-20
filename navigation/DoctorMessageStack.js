import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ChatScreen from "../Screens/ChatScreen";
import DoctorMessages from "../Screens/DoctorsScreens/DoctorMessages";

const Stack = createStackNavigator();

const DoctorMessageStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DMessages"
        component={DoctorMessages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => {
          console.log(route);
          return {
            title: route.params.userName,
            headerBackTitleVisible: false,
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default DoctorMessageStack;
