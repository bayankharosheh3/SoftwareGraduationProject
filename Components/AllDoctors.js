import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import DATA from "../assets/data/doctorsData";
import List from "./List";
import axios from "axios";
const AllDoctors = ({ route }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const getUsers = () => {
    axios
      .post("http://10.0.2.2:80/backend/all_doctors.php")
      .then((response) => response.data)
      .then((json) => setUsers(json))
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
