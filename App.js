import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
 import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from '@react-navigation/drawer';
// screens
import { HomeScreen, MainScreen, SplashScreen } from "./Screens";
import RoutingDataProvider from "./Components/Context/RoutingDataProvider";
import DoctorSchedule from "./Screens/DoctorsScreens/DoctorSchedule";
import PatientHistory from "./Screens/PatientHistory";
import DoctorLabResult from "./Screens/DoctorsScreens/DoctorLabResult";
import DoctorPatientHistory from "./Screens/DoctorsScreens/DoctorPatientHistory";
import BillsScreen from "./Screens/BillsScreen";
import Bill from "./Screens/Payment";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import WebView from "react-native-webview";
const firebaseConfig = {
 apiKey: "AIzaSyA0qW0ofjQrESKFl42SGSGuYanbZYUE_3M",
authDomain: "test-936cb.firebaseapp.com",
projectId: "test-936cb",
storageBucket: "test-936cb.appspot.com",
messagingSenderId: "61739292464",
appId: "1:61739292464:web:995562380f64d3ce605af5",
measurementId: "G-33MQ2TP5B3"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const App = () => {
  const [changeScreen, setChangeScreen] = useState(false);

  // after 3 seconds it should redirect to HomeScreen
  useEffect(() => {
    setTimeout(() => {
      setChangeScreen(true);
    }, 3000);
  }, []);

  return (
    <RoutingDataProvider>
      <View style={styles.mainContainer}>
        <StatusBar />
        {changeScreen ? <MainScreen /> : <SplashScreen />}
      </View>
    </RoutingDataProvider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
