import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { COLORS } from "../assets/constants";
import { ClinicsScreen, DoctorProfileScreen, HomeScreen } from "../Screens";
import AppointmentsList from "../Screens/AppointmentsScreen";
import EditAccountPage from "../Screens/EditAccountPage";
import MedicalFilesPage from "../Screens/MedicalFilesPage";
import NotificationsPage from "../Screens/NotificationsPage";
import PatientHistory from "../Screens/PatientHistory";
import StarRating from "../Screens/RatingScreen";
import SupportingPage from "../Screens/SupportingScreen";
import ClinicsStack from "./ClinicsStack";
import DoctorsStack from "./DoctorsStack";
import PrescriptionsStack from "./PrescriptionsStack";
import TabNav from "./TabNav";

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PatientHistory"
        component={PatientHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home"
        component={TabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClinicStack"
        component={ClinicsStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorStack"
        component={DoctorsStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Appointment" component={AppointmentsList} />
      <Stack.Screen name="Rating" component={StarRating} />

      <Stack.Screen
        name="PrescriptionsStack"
        component={PrescriptionsStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announcements"
        component={NotificationsPage}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.Main,
            // height:120,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EditAccountPage"
        component={EditAccountPage}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.Main,
            // height:120,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="MedicalFilesPage"
        component={MedicalFilesPage}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.Main,
            // height:120,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="SupportingPage"
        component={SupportingPage}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.Main,
            // height:120,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
