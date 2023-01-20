import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "../navigation/AuthStack";
import { RoutingData } from "../Components/Context/RoutingDataProvider";
import HomeStack from "../navigation/HomeStack";
import DoctorRoute from "../navigation/DoctorRoute";

const MainScreen = () => {
  const loggedInData = useContext(RoutingData);

  console.log(loggedInData.loggedInAs);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        {loggedInData.loggedIn ? (
          loggedInData.loggedInAs == "patient" ? (
            <HomeStack />
          ) : (
            <DoctorRoute />
          )
        ) : (
          <AuthStack
            setLoggedIn={loggedInData.setLoggedIn}
            setLoggedInAs={loggedInData.setLoggedInAs}
            setUserId={loggedInData.setUserId}
          />
        )}
      </NavigationContainer>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
