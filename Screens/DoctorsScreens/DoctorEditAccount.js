import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../assets/constants";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import { useRef } from "react";
import axios from "axios";
import { RoutingData } from "../../Components/Context/RoutingDataProvider";

const EditAccountPage = () => {
  const [permission, setPermission] = useState(null);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    img:"",
  });
  const [isLoading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setInfo({ ...info, img: result.uri });
    }
  };

  if (permission === false) {
    return <Text>No access to internal storage</Text>;
  }

  const changeImg = () => {
    if (info.img !== "") {
      return { uri: info.img };
    } else {
      return { uri: doctor.image };
    }
  };

  const dataSignIn = useContext(RoutingData);
  console.log(dataSignIn.userId);
  var Data = {
    id: dataSignIn.userId,
    email: info.email,
    name: info.firstName,
    phone: info.phoneNumber,
    Image:info.img,
  };
  const getPatient = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor_info.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setDoctor(json);
        setInfo({ ...info, firstName: json.name,
          email: json.email,
          phoneNumber: json.phone,
          img: json.image,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getPatient();
  }, []);

  var Data1 = {
    id: dataSignIn.userId,
    email: info.email,
    name: info.firstName,
    phone: info.phoneNumber,
    Image:info.img,
  };
 // console.log(Data1);


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <ScrollView style={styles.container0}>
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={changeImg()} style={styles.imgProfile} />

        <TouchableOpacity
          onPress={() => {
            pickImg();
          }}
          style={styles.changeBtn}
        >
          <Text style={styles.changeBtnText}>change pic</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.personaInfo}>
        <View style={styles.titleView}>
          <Text style={styles.title}>personal info </Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              setEdit(true);
            }}
          >
            <FontAwesome5Icons name={"pen"} style={styles.editIcon} />
            <Text style={styles.editText}>edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>first name</Text>
            <TextInput
              style={edit ? styles.edit : styles.value}
              
              editable={edit}
              onChangeText={(text) => {
                setInfo({ ...info, firstName: text });
              }}>{doctor.name}</TextInput>
           
          </View>
        </View>
      
        <View style={styles.row}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>email</Text>
            <TextInput
              style={edit ? styles.edit : styles.value}
            
              editable={edit}
              onChangeText={(text) => {
                setInfo({ ...info, email: text });
              }}> {doctor.email}</TextInput>
           
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>phone number</Text>
            <TextInput
              style={edit ? styles.edit : styles.value}
              
              editable={edit}
              onChangeText={(text) => {
                setInfo({ ...info, phoneNumber: text });
              }}>{doctor.phone}</TextInput>
          
          </View>
        </View>
       
        <View
          style={{
            flex: 0.1,
            borderTopColor: "#edf1f7",
            borderTopWidth: 1,
            width: "100%",
            alignItems: "center",
            padding: 30,
          }}
        >
          <TouchableOpacity
            style={[styles.changeBtn]}
            onPress={() => {
             
                axios
                  .post("http://10.0.2.2:80/backend/doctor/edit_account.php", Data1)
                  .then((response) => response.data)
                  .then((json) => {
                   // setPatient(json);
                console.log(json);
                  })
                  .catch((error) => console.error(error))
                  .finally(() => setLoading(false));
             
            }}
          >
            <Text style={styles.changeBtnText}>save changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditAccountPage;

const styles = StyleSheet.create({
  imgProfile: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: COLORS.Main,
    borderWidth: 2,
    marginBottom: 15,
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  container0: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.Background,
    position: "relative",
  },
  imgContainer: {
    width: "90%",
    borderBottomColor: "#edf1f7",
    borderBottomWidth: 1,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.35,
  },
  changeBtn: {
    width: "40%",
    backgroundColor: COLORS.Main,
    borderColor: COLORS.Main,
    borderWidth: 2,
    padding: 7,
    borderRadius: 5,
    alignItems: "center",
  },
  changeBtnText: {
    fontSize: 14,
    textTransform: "uppercase",
    color: "white",
  },
  personaInfo: {
    width: "100%",
    flex: 0.7,
    alignItems: "center",
  },
  titleView: {
    flexDirection: "row",
    flex: 0.15,
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textTransform: "capitalize",
    fontSize: 16,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  editIcon: {
    marginRight: 6,
    color: "#8f9bb3",
  },
  editText: {
    textTransform: "capitalize",
    fontSize: 14,
    color: "#8f9bb3",
  },
  row: {
    width: "100%",
    borderTopColor: "#edf1f7",
    borderTopWidth: 1,
    flex: 0.14,
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  label: {
    width: "40%",
    textTransform: "capitalize",
    fontSize: 14,
    color: "#8f9bb3",
  },
  value: {
    width: "60%",
    padding: 11,
    textTransform: "capitalize",
    fontSize: 14,
    color: "black",
  },
  edit: {
    width: "55%",
    padding: 10,
    backgroundColor: "#f7f9fc",
    borderColor: "#edf1f7",
    borderWidth: 1,
    borderRadius: 3,
  },
});
