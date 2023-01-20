import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { RoutingData } from "../../Components/Context/RoutingDataProvider";
import { COLORS } from "../../assets/constants";
import LabsSearchBar from "../../Components/DoctorComponents/LabsSearchBar";
import LabsList from "../../Components/DoctorComponents/LabsList";

import axios from "axios";
function DoctorLabs({ navigation }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const dataSignIn = useContext(RoutingData);
  console.log(dataSignIn.userId);
  var Data = {
    id: dataSignIn.userId,
  };
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const getUsers1 = () => {
    axios
    .post("http://10.0.2.2:80/backend/doctor/labs.php",Data)
    .then((response) => response.data)
    .then((json) => {
      setUsers(json);
    console.log(json);})
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  };
    useEffect(() => {
      setLoading(true);
      getUsers1();
    }, []);


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.search}>
            {!clicked}
            <LabsSearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </View>
        </View>
        <View style={styles.container1}>
          <LabsList
            searchPhrase={searchPhrase}
            data={users}
            setClicked={setClicked}
            navigation={navigation}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: "100%",
  },
  header: {
    flex: 0.8,
    width: "100%",
    backgroundColor: COLORS.Main,
  },
  search: {
    flex: 2,
    width: "100%",
  },
  container1: {
    flex: 8,
    width: "100%",
  },
});

export default DoctorLabs;
