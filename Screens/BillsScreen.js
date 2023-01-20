import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { COLORS } from "../assets/constants";
import BillsSearchBar from "../Components/BillsSearchBar";
import BillsList from "../Components/BillsList";
import { RoutingData } from "../Components/Context/RoutingDataProvider";
import axios from "axios";

function BillsScreen({ navigation }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [prescription, setPrescription] = useState([]);
  const dataSignIn = useContext(RoutingData);
  console.log(dataSignIn.userId);
  var Data = {
    p_id: dataSignIn.userId,
  };
  const getPrescription = () => {
    axios
      .post("http://10.0.2.2:80/backend/bills.php", Data)
      .then((response) => response.data)
      .then((json) => setPrescription(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    getPrescription();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.search}>
            {!clicked}
            <BillsSearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </View>
        </View>
        <View style={styles.container1}>
          <BillsList
            searchPhrase={searchPhrase}
            data={prescription}
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

export default BillsScreen;
