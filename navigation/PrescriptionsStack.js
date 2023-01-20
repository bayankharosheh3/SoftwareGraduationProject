import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PrescriptionsScreen from "../Screens/PrescriptionsScreen";
import Prescription from "../Screens/Prescription";

const Stack = createStackNavigator();

const PrescriptionsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Prescriptions"
        component={PrescriptionsScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Prescription"
        component={Prescription}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default PrescriptionsStack;
