import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  DoctorSignUp,
  OnBoardingScreen,
  SignInScreen,
  SignUpPatientScreen,
} from "../Screens";

const Stack = createStackNavigator();

const AuthStack = ({ setLoggedIn, setLoggedInAs, setUserId }) => {
  return (
    <Stack.Navigator initialRouteName="OnBoarding">
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
        initialParams={{
          loggedInFun: setLoggedIn,
          setLoggedInAs: setLoggedInAs,
          setUserId: setUserId,
        }}
      />
      <Stack.Screen
        name="SignUpPatientScreen"
        component={SignUpPatientScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorSignUp"
        component={DoctorSignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
