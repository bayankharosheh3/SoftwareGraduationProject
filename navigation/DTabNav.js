import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../assets/constants";
import MessageStack from "./MessageStack";
import AppointmentsScreen from "../Screens/BookAppointmentScreen";
import { HomeScreen } from "../Screens";
import BillsScreen from "../Screens/BillsScreen";
import DoctorHome from "../Screens/DoctorsScreens/DoctorHome";
import DoctorProfile from "../Screens/DoctorsScreens/DoctorProfile";
import DoctorSchedule from "../Screens/DoctorsScreens/DoctorSchedule";
import DoctorMessageStack from "./DoctorMessageStack";

const Tab = createBottomTabNavigator();

const DTabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 65,
        },
      }}
      initialRouteName="AllExercises"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const icons = {
            HomeScreen: "home",
            MessagesPage: "comment-medical",
            Schedule: "calendar-alt",
            Profile: "user-alt",
          };
          return (
            <FontAwesome5Icons
              name={icons[route.name]}
              color={focused ? COLORS.Main : COLORS.black}
              style={{
                marginTop: 8,
                fontSize: 22,
                opacity: focused ? 1 : 0.5,
              }}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          const labels = {
            HomeScreen: "",
            ChatPage: "",
            Schedule: "",
            ProfilePage: "",
          };

          return (
            <Text
              style={{
                color: focused ? COLORS.accent : COLORS.black,
                // marginBottom: 8,
                opacity: focused ? 1 : 0.6,
                fontWeight: "bold",
              }}
            >
              {labels[route.name]}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={DoctorHome}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MessagesPage"
        component={DoctorMessageStack}
        options={{ headerShown: false }}
        // options={({ route }) => console.log(route)}
      />
      <Tab.Screen
        name="Schedule"
        component={DoctorSchedule}
        // options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={DoctorProfile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

// tabs

// const MessageStack = ({ navigation, route }) => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Messages"
//         component={MessagesPage}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Chat"
//         component={ChatPage}
//         options={({ route }) => {
//           console.log(route);
//           return {
//             title: route.params.userName,
//             headerBackTitleVisible: false,
//           };
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// const ProfileStack = ({ navigation, route }) => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Profile"
//         component={ProfilePage}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Notifications"
//         component={NotificationsPage}
//         options={{
//           headerBackTitleVisible: false,
//           headerStyle: {
//             backgroundColor: COLORS.Main,
//             // height:120,
//           },
//           headerTintColor: "#fff",
//         }}
//       />
//       <Stack.Screen
//         name="EditAccountPage"
//         component={EditAccountPage}
//         options={{
//           headerBackTitleVisible: false,
//           headerStyle: {
//             backgroundColor: COLORS.Main,
//             // height:120,
//           },
//           headerTintColor: "#fff",
//         }}
//       />
//       <Stack.Screen
//         name="MedicalFilesPage"
//         component={MedicalFilesPage}
//         options={{
//           headerBackTitleVisible: false,
//           headerStyle: {
//             backgroundColor: COLORS.Main,
//             // height:120,
//           },
//           headerTintColor: "#fff",
//         }}
//       />
//       <Stack.Screen
//         name="SupportingPage"
//         component={SupportingPage}
//         options={{
//           headerBackTitleVisible: false,
//           headerStyle: {
//             backgroundColor: COLORS.Main,
//             // height:120,
//           },
//           headerTintColor: "#fff",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

export default DTabNav;
