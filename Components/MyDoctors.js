import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import List from "./List";
import axios from "axios";
import { RoutingData } from "../Components/Context/RoutingDataProvider";

const AllDoctors = ({ route }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const dataSignIn = useContext(RoutingData);
  console.log(dataSignIn.userId);
  var Data = {
    p_id: dataSignIn.userId,
  };
  const getUsers = () => {
    axios
      .post("http://10.0.2.2:80/backend/my_doctors.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setUsers(json);
      console.log(json);})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);

  const { searchPhrase, setClicked, clicked, navigation } = route.params;
  console.log(route.params);
  return (
    <SafeAreaView>
      {!clicked}
      {
        <List
          searchPhrase={searchPhrase}
          data={users}
          setClicked={setClicked}
          navigation={navigation}
        />
      }
    </SafeAreaView>
  );
};

export default AllDoctors;
