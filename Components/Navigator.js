import { Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatPage, AppointmentsPage, ProfilePage } from "./Pages";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../assets/constants";
import MessagesPage from "../Screens/MessagesScreen";
import NotificationsPage from "./Pages/NotificationsPage";
import EditAccountPage from "../Screens/EditAccountPage";
import SupportingPage from "../Screens/SupportingPage";
import {
  ClinicDoctorsScreen,
  ClinicsScreen,
  HomeScreen,
  OnBoardingScreen,
  SignInScreen,
  SignUpPatientScreen,
} from "../Screens";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"OnBoardingScreen"}>
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpPatientScreen"
        component={SignUpPatientScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Clinics"
        component={ClinicsStack}
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
      {/* <Stack.Screen
        name="BillScreen"
        component={BillScreen}
        options={{ headerShown: false }}
      /> */}

      {/* BillScreen */}
    </Stack.Navigator>
  );
};

// export default StackNavigator;

const ClinicsStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Clinics"
        component={ClinicsScreen}
        options={
          ({ route }) => {
            console.log(route);
            return {
              // title: route.params.userName,
            };
          }
          // {
          //   headerStyle: {
          //     backgroundColor: COLORS.Main,
          //   },
          //   headerTitleStyle: {
          //     color: COLORS.FontColorWithBackground,
          //   },
          //   headerTintColor: COLORS.FontColorWithBackground,
          //   headerBackTitleVisible: false,
          // })
        }
      />
      <Stack.Screen
        name="ClinicDoctors"
        component={ClinicDoctorsScreen}
        options={{
          headerBackTitleVisible: false,
        }}
        //   options={({ route }) => {
        //     console.log(route.name);
        //     return {
        //       title: route.params.userName,
        //       headerBackTitleVisible: false,
        //     };
        //   }
        // }
      />
    </Stack.Navigator>
  );
};

// tabs

const MessageStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={MessagesPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatPage}
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

const ProfileStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
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

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
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
            AppointmentsPage: "calendar-alt",
            ProfilePage: "user-alt",
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
            AppointmentPage: "",
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
        component={StackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MessagesPage"
        component={MessageStack}
        options={{ headerShown: false }}
        // options={({ route }) => console.log(route)}
      />
      <Tab.Screen
        name="AppointmentsPage"
        component={AppointmentsPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
