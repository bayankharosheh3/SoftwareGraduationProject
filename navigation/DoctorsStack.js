import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BookAppointmentScreen from "../Screens/BookAppointmentScreen";
import BookingSuccessPage from "../Screens/BookingSuccessPage";
import ChatScreen from "../Screens/ChatScreen";
import DoctorList from "../Screens/DoctorList";
import DoctorProfileScreen from "../Screens/DoctorProfileScreen";
import Bill from "../Screens/Payment";
import ReviewsScreen from "../Screens/ReviewsScreen";

const Stack = createStackNavigator();

const DoctorsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Doctors" component={DoctorList} />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfileScreen}
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
        name="Payment"
        component={Bill}
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

export default DoctorsStack;
