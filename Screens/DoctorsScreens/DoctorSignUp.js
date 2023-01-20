import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS } from "../../assets/constants";
import { SignUpAlert } from "../../Components";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
const data1 = [
  { key: "1", value: "spesiality1" },
  { key: "2", value: "spesiality2" },
  { key: "3", value: "spesiality3" },
];
function DoctorSignUp({ navigation }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const [users, setUsers] = useState("");
  const [signUpWith, setSignUpWith] = useState({
    Email: "",
    Password: "",
    Phonenumber: "",
    Name: "",
    Error: "",
    Spesiality: "",
  });

  const [clinics, setClinics] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const getClinics = () => {
    fetch("http://10.0.2.2:80/backend/spesialitylist.php")
      .then((response) => response.json())
      .then((json) => setClinics(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    getClinics();
  }, []);

  const [value, setValue] = useState(null);
  var Data = {
    Email: signUpWith.Email,
    Password: signUpWith.Password,
    Spesiality: signUpWith.Spesiality,
    Phonenumber: signUpWith.Phonenumber,
    Name: signUpWith.Name,
  };
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={styles.container1}>
            <View style={styles.container1_1}>
              <Image
                source={require("./../../assets/images/login_logo.png")}
                style={styles.logo}
              />
            </View>
            <View style={styles.container1_2}>
              <Text style={styles.logintext}>Sign Up</Text>
              <Text style={styles.logindiscreption}>
                Please enter your credentials
              </Text>
            </View>
          </View>

          <View style={styles.container2}>
            <View style={styles.container2_1}>
              <Text style={styles.credentials}>Doctor Name</Text>
            </View>
            <View style={styles.container2_2}>
              <TextInput
                placeholder={"Name"}
                style={styles.input}
                value={signUpWith.Name}
                onChangeText={(text) => {
                  setSignUpWith({ ...signUpWith, Name: text });
                }}
              />
            </View>
            <View style={styles.container2_11}>
              <Text style={styles.credentials}>Specialty</Text>
            </View>
            <View style={styles.container2_1}>
              <SelectList
                setSelected={(val) =>
                  setSignUpWith({ ...signUpWith, Spesiality: val })
                }
                data={clinics}
                save="key"
                boxStyles={styles.input2}
              />
            </View>
            <View style={styles.container2_1}>
              <Text style={styles.credentials}>Email</Text>
            </View>
            <View style={styles.container2_2}>
              <TextInput
                placeholder={"Email"}
                style={styles.input}
                value={signUpWith.Email}
                onChangeText={(text) => {
                  setSignUpWith({ ...signUpWith, Email: text });
                }}
              />
            </View>
            <View style={styles.container2_1}>
              <Text style={styles.credentials}>Mobile Number</Text>
            </View>
            <View style={styles.container2_2}>
              <TextInput
                placeholder={" Mobile Number"}
                style={styles.input}
                keyboardType="numeric"
                value={signUpWith.Phonenumber}
                onChangeText={(text) => {
                  setSignUpWith({ ...signUpWith, Phonenumber: text });
                }}
              />
            </View>
            <View style={styles.container2_1}>
              <Text style={styles.credentials}>Password</Text>
            </View>
            <View style={styles.container2_2}>
              <TextInput
                placeholder={"Password"}
                secureTextEntry={true}
                style={styles.input}
                value={signUpWith.Password}
                onChangeText={(text) => {
                  setSignUpWith({ ...signUpWith, Password: text });
                }}
              />
            </View>
          </View>

          <View View style={styles.container2_2}>
            <Text style={styles.error}>{error}</Text>
          </View>

          <View style={styles.container3}>
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => {
                var checkEmail = RegExp(
                  /^\w+([\.-]?\w+)*dr@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                );
                if (
                  signUpWith.Name === "" ||
                  signUpWith.Email === "" ||
                  signUpWith.Phonenumber === "" ||
                  signUpWith.Password === ""
                ) {
                  setError("error,fill all inputs please");
                } else if (!checkEmail.test(signUpWith.Email)) {
                  setError("Enter a valid email address");
                } else if (signUpWith.Password.length < 8) {
                  setError("Minimum 08 characters required!!!");
                } else if (/[ ]/.test(signUpWith.Password)) {
                  setError("Don't include space in password!!!");
                } else {
                  axios
                    .post("http://10.0.2.2:80/backend/signup_doctor.php", Data)
                    .then((response) => response.data)
                    .then((json) => {
                      setError(json);
                      if (json == "Complete") {
                        setShow(true);
                      }
                    })
                    .catch((error) => console.error(error))
                    .finally(() => setLoading(false));

                  console.log(signUpWith);
                  setError("");
                }
              }}
            >
              <Text style={styles.signUp}>Sign up</Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text>have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.replace("SignInScreen")}
              >
                <Text style={styles.link}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <View style={[styles.container4, { display: show ? "flex" : "none" }]}>
        <SignUpAlert fun={setShow} fun2={setSignUpWith} navigation={navigation}/>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.Background,
    position: "relative",
  },
  container1: {
    flex: 0.3,
    width: "100%",
    backgroundColor: COLORS.Main,
  },
  container1_1: {
    flex: 0.5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: "5%",
    paddingTop: "15%",
    paddingBottom: 10,
    marginBottom: 10,
  },
  container1_2: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 7,
  },
  container2: {
    flex: 0.5,
    width: "100%",
    marginBottom: "0%",
    marginTop: "0%",
  },
  container2_1: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: "5%",
    paddingTop: "5%",
    paddingBottom: 3,
    width: "100%",
  },
  container2_11: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: "5%",
    paddingTop: "2%",
    width: "100%",
  },
  container2_2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container3: {
    flex: 0.2,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  credentials: {
    color: COLORS.FontColorNoBackground,
    fontSize: 15,
  },
  input: {
    width: "90%",
    height: 44,
    padding: 10,
    borderBottomColor: COLORS.InputBorder,
    borderBottomWidth: 0.5,
    marginBottom: 5,
    backgroundColor: COLORS.InputBackground,
  },
  input2: {
    // justifyContent:'space-between',
    width: 200,
    paddingLeft: "2%",
    paddingRight: "0%",
    height: 44,
    borderBottomColor: COLORS.InputBorder,
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 0.5,
    // marginBottom: 5,
    backgroundColor: COLORS.InputBackground,
  },
  link: {
    fontWeight: "bold",
    color: COLORS.Main,
  },
  logintext: {
    color: COLORS.FontColorWithBackground,
    fontSize: 30,
    //  fontFamily: 'Arial',
    fontWeight: "bold",
  },
  logindiscreption: {
    color: COLORS.FontColorWithBackground,
    fontSize: 15,
  },
  logo: {
    width: 80,
    height: 80,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  signUpBtn: {
    backgroundColor: COLORS.Main,
    width: "90%",
    margin: 0,
    borderRadius: 7,
    padding: 13,
  },
  signUp: {
    color: COLORS.FontColorWithBackground,
    textAlign: "center",
    fontSize: 16,
  },
  container4: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  error: {
    color: "red",
  },
});
export default DoctorSignUp;
