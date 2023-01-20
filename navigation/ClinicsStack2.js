import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ClinicDoctorsScreen, ClinicsScreen } from "../Screens";
import BookAppointmentScreen from "../Screens/BookAppointmentScreen";
import BookingSuccessPage from "../Screens/BookingSuccessPage";
import ReviewsScreen from "../Screens/ReviewsScreen";

const Stack = createStackNavigator();

const ClinicsStack2 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Clinics"
        component={ClinicsScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ClinicDoctors"
        component={ClinicDoctorsScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="BookingSuccess"
        component={BookingSuccessPage}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ClinicsStack2;
