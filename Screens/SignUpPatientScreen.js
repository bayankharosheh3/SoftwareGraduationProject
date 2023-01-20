import React, { Component } from "react";
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
import { COLORS } from "../assets/constants";

export default class SignUpPatientScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      Phonenumber: "",
      Name: "",
      Error: "",
      check_textInputChange: false,
      secureTextEntry: true,
      confirmSecureTextEntry: true,
    };
  }

  InsertRecord = () => {
    var Email = this.state.Email;
    var Password = this.state.Password;
    var Phonenumber = this.state.Phonenumber;
    var Name = this.state.Name;
    var checkEmail = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (
      Email.length == 0 ||
      Password.length == 0 ||
      Phonenumber.length == 0 ||
      Name.length == 0
    ) {
      this.setState({ Error: "error,fill all inputs please" });
    } else if (!checkEmail.test(Email)) {
      this.setState({ Error: "Enter a valid email address" });
    } else if (Password.length < 8) {
      this.setState({ Error: "Minimum 08 characters required!!!" });
    } else if (/[ ]/.test(Password)) {
      this.setState({ Error: "Don't include space in password!!!" });
    } else {
      var InsertAPIURL = "http://10.0.2.2:80/backend/signup.php"; //API to render signup

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        Email: Email,
        Password: Password,
        Name: Name,
        Phonenumber: Phonenumber,
      };

      // FETCH func ------------------------------------
      fetch(InsertAPIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data), //convert data to JSON
      })
        .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
        .then((response) => {
          this.setState({ Error: response[0].Message }); // If data is in JSON => Display alert msg
          if (this.state.Error == "Complete") {
            console.log("true");
            this.props.navigation.navigate("SignInScreen");
          }
        })
        .catch((error) => {
          alert("Error Occurred" + error);
        });
    }
  };

  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  updateConfirmSecureTextEntry() {
    this.setState({
      ...this.state,
      confirmSecureTextEntry: !this.state.confirmSecureTextEntry,
    });
  }

  render() {
    return (
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.container}>
            <View style={styles.container1}>
              <View style={styles.container1_1}>
                <Image
                  source={require("./../assets/images/login_logo.png")}
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
                <Text style={styles.credentials}>Name</Text>
              </View>
              <View style={styles.container2_2}>
                <TextInput
                  placeholder={"Name"}
                  style={styles.input}
                  // value={signUpWith.name}
                  onChangeText={(Name) => this.setState({ Name })}
                />
              </View>
              <View style={styles.container2_1}>
                <Text style={styles.credentials}>Email</Text>
              </View>
              <View style={styles.container2_2}>
                <TextInput
                  placeholder={"Email"}
                  style={styles.input}
                  // value={signUpWith.email}
                  onChangeText={(Email) => this.setState({ Email })}
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
                  // value={signUpWith.phone}
                  onChangeText={(Phonenumber) => this.setState({ Phonenumber })}
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
                  // value={signUpWith.password}
                  onChangeText={(Password) => this.setState({ Password })}
                />
              </View>
            </View>

            <View View style={styles.container2_2}>
              {<Text style={styles.error}>{this.state.Error}</Text>}
            </View>

            <View style={styles.container3}>
              <TouchableOpacity
                style={styles.signUpBtn}
                onPress={() => {
                  this.InsertRecord();
                }}
                //   onPress={() => {
                //     if (
                //       signUpWith.name === "" ||
                //       signUpWith.email === "" ||
                //       signUpWith.phone === "" ||
                //       signUpWith.password === ""
                //     ) {
                //       setError("error,fill all inputs please");
                //     } else {
                //     //  setShow(true);
                //       console.log(signUpWith);
                //       setError("");
                //     }
                //   }
                // }
              >
                <Text style={styles.signUp}>Sign up</Text>
              </TouchableOpacity>
              <View style={styles.row}>
                <Text>have an account? </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.replace("SignInScreen")}
                >
                  <Text style={styles.link}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={[styles.container4]}></View>
      </>
    );
  }
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
    paddingBottom: 10,
  },
  container2: {
    flex: 0.5,
    width: "100%",
    marginBottom: "7%",
    marginTop: "3%",
  },
  container2_1: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: "5%",
    paddingTop: "5%",
    paddingBottom: 5,
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
    marginBottom: 10,
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
    margin: 10,
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
