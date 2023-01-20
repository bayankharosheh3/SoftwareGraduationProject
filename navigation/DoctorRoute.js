import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ClinicsScreen, DoctorProfileScreen, HomeScreen } from "../Screens";
import DoctorAppointments from "../Screens/DoctorsScreens/DoctorAppointments";
import DoctorEditAccount from "../Screens/DoctorsScreens/DoctorEditAccount";
import DoctorFiles from "../Screens/DoctorsScreens/DoctorFiles";
import DoctorHome from "../Screens/DoctorsScreens/DoctorHome";
import DoctorLabs from "../Screens/DoctorsScreens/DoctorLabs";
import DoctorLabResult from "../Screens/DoctorsScreens/DoctorLabResult";
import DoctorNotifications from "../Screens/DoctorsScreens/DoctorNotifications";
import DoctorPrescription from "../Screens/DoctorsScreens/DoctorPrescription";
import DoctorReviews from "../Screens/DoctorsScreens/DoctorReviews";
import DoctorSchedule from "../Screens/DoctorsScreens/DoctorSchedule";
import DoctorSupporting from "../Screens/DoctorsScreens/DoctorSupporting";
import PatientProfileScreen from "../Screens/DoctorsScreens/PatientProfileScreen";
import PatientsScreen from "../Screens/DoctorsScreens/PatientsScreen";
import ClinicsStack from "./ClinicsStack";
import DoctorsStack from "./DoctorsStack";
import DTabNav from "./DTabNav";
import DoctorPatientHistory from "../Screens/DoctorsScreens/DoctorPatientHistory";

const Stack = createStackNavigator();
const DoctorRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DoctorHome"
        component={DTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Patients"
        component={PatientsScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Patient Profile"
        component={PatientProfileScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Doctor Appointments"
        component={DoctorAppointments}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Doctor Prescription"
        component={DoctorPrescription}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Doctor Reviews"
        component={DoctorReviews}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Schedule"
        component={DoctorSchedule}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Account"
        component={DoctorEditAccount}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={DoctorNotifications}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Files"
        component={DoctorFiles}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Supporting"
        component={DoctorSupporting}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Labs"
        component={DoctorLabs}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lab Result"
        component={DoctorLabResult}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Patient History"
        component={DoctorPatientHistory}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DoctorRoute;
