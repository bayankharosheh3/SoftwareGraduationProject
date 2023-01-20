import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { COLORS } from "../assets/constants";
import ClinicDoctorSearch from "../Components/ClinicDoctorSearch";
import ClinicDoctorList from "../Components/ClininDoctorList";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
function ClinicDoctorsScreen({ navigation, route }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  var Data = {
    id: route.params.clinicId,
  };
  const getUsers = () => {
    axios
      .post("http://10.0.2.2:80/backend/clinic_doctors.php", Data)
      .then((response) => response.data)
      .then((json) => setUsers(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);
  console.log(route.params.clinicId);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.search}>
            {!clicked}
            <ClinicDoctorSearch
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </View>
        </View>
        <View style={styles.container1}>
          <ClinicDoctorList
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

export default ClinicDoctorsScreen;
