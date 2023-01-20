import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ChatScreen from "../Screens/ChatScreen";
import MessagesScreen from "../Screens/MessagesScreen";

const Stack = createStackNavigator();

const MessageStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
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

export default MessageStack;
