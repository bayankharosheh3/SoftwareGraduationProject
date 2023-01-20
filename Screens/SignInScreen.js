import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../assets/constants";
import login_logo from "./../assets/images/login_logo.png";

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      Error: "",
      setError: "",
      Email: "",
      Password: "",
      check_textInputChange: false,
      secureTextEntry: true,
      confirmSecureTextEntry: true,
    };
  }

  InsertRecord = () => {
    var Email = this.state.Email;
    var Password = this.state.Password;
    var checkEmail = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var checkEmaildoctor = RegExp(
      /^\w+([\.-]?\w+)*dr@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    if (Email.length == 0 || Password.length == 0) {
      this.setState({ Error: "error,fill all inputs please" });
    } else if (!checkEmail.test(Email) && !checkEmaildoctor.test(Email)) {
      this.setState({ Error: "Enter a valid email address" });
    } else if (checkEmaildoctor.test(Email)) {
      var APIURL = "http://10.0.2.2:80/backend/signin_doctor.php";

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        Email: Email,
        Password: Password,
      };

      fetch(APIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((Response) => Response.json())
        .then((Response) => {
          this.setState({ Error: Response[0].Message });

          if (Response[0].Message == "Success") {
            console.log("true");
            this.props.route.params.loggedInFun(true);
            this.props.route.params.setLoggedInAs("doctor");
            this.props.route.params.setUserId(Response[0].m);
          }
         // console.log(Response[0].m);
        })
        .catch((error) => {
          console.error("ERROR FOUND" + error);
        });
    } else {
      var APIURL = "http://10.0.2.2:80/backend/signin.php";

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        Email: Email,
        Password: Password,
      };

      fetch(APIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((Response) => Response.json())
        .then((Response) => {
          this.setState({ Error: Response[0].Message });

          if (Response[0].Message == "Success") {
            console.log("true");
            this.props.route.params.loggedInFun(true);
            this.props.route.params.setLoggedInAs("patient");
            this.props.route.params.setUserId(Response[0].m);
          }
          console.log(Data);
        })
        .catch((error) => {
          console.error("ERROR FOUND" + error);
        });
    }
  };

  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.container1}>
            <View style={styles.container1_1}>
              <Image source={login_logo} style={styles.logo} />
            </View>
            <View style={styles.container1_2}>
              <Text style={styles.logintext}>Sign In</Text>
              <Text style={styles.logindiscreption}>
                Please enter your credentials
              </Text>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.container2_1}>
              <Text style={styles.credentials}>Email</Text>
            </View>
            <View style={styles.container2_2}>
              <TextInput
                placeholder={"Email"}
                style={styles.input}
                onChangeText={(Email) => this.setState({ Email })}
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
                onChangeText={(Password) => this.setState({ Password })}
              />
            </View>
          </View>
          <View View style={styles.container2_2}>
            {<Text style={styles.error}>{this.state.Error}</Text>}
          </View>
          <View style={styles.container3}>
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => {
                this.InsertRecord();
              }}
            >
              <Text style={styles.signIn}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text>Don’t have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ show: true });
                }}
              >
                <Text style={styles.link}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.popUp,
              { display: this.state.show ? "flex" : "none" },
            ]}
          >
            <View style={styles.popUpCont}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ show: false });
                }}
              >
                <View style={styles.cancel}></View>
              </TouchableOpacity>
              <View style={styles.btnCont}>
                <Text style={styles.popUpTitle}>how would you sign up?</Text>
                <TouchableOpacity
                  style={styles.popUpBtn}
                  onPress={() => {
                    this.setState({ show: false });
                    this.props.navigation.navigate("DoctorSignUp");
                  }}
                >
                  <View style={styles.btnContainer}>
                    <FontAwesome5Icon name="user-md" style={styles.popUpIcon} />
                    <View>
                      <Text style={styles.iconTitle}>doctor</Text>
                      <Text style={styles.iconDesc}>
                        Connect with your patients immediately.
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popUpBtn}
                  onPress={() => {
                    this.setState({ show: false });
                    this.props.navigation.navigate("SignUpPatientScreen");
                  }}
                >
                  <View style={styles.btnContainer}>
                    <FontAwesome5Icon name="user" style={styles.popUpIcon} />
                    <View>
                      <Text style={styles.iconTitle}>patient</Text>
                      <Text style={styles.iconDesc}>
                        Easiest way to book appointment with favorite doctor.
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: "100%",
    alignItems: "center",
  },
  container1: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.Main,
  },
  container1_1: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: "5%",
    paddingBottom: "13%",
  },
  container1_2: {
    flex: 1,
    paddingLeft: 20,
  },
  container2: {
    flex: 0.8,
    width: "100%",
    backgroundColor: COLORS.Background,
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
    backgroundColor: COLORS.Background,
  },
  container3: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.Background,
  },
  credentials: {
    fontSize: 15,
  },
  input: {
    width: "90%",
    height: 44,
    padding: 10,
    borderWidth: 0.2,
    marginBottom: 10,
    backgroundColor: COLORS.InputBackground,
    borderWidth: 0,
    borderBottomColor: COLORS.InputBorder,
    borderBottomWidth: 0.5,
  },
  link: {
    fontWeight: "bold",
    color: COLORS.Main,
  },
  login_button: {
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.Main,
    marginBottom: 10,
    backgroundColor: COLORS.Main,
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
  signInBtn: {
    backgroundColor: COLORS.Main,
    width: "90%",
    margin: 10,
    borderRadius: 7,
    padding: 13,
  },
  signIn: {
    color: COLORS.FontColorWithBackground,
    textAlign: "center",
    fontSize: 16,
  },
  popUp: {
    width: "100%",
    backgroundColor: COLORS.poUpBackground,
    position: "absolute",
    bottom: 0,
    height: "100%",
  },
  popUpCont: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: "30%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
  },
  cancel: {
    backgroundColor: COLORS.DetailsColor,
    width: 40,
    height: 5,
    borderRadius: 4,
    marginTop: 15,
    marginBottom: 30,
  },
  btnCont: {
    width: "90%",
    flex: 0.7,
  },
  popUpTitle: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "600",
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  popUpBtn: { marginBottom: 10, width: "100%" },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  popUpIcon: {
    fontSize: 24,
    paddingRight: 20,
    color: COLORS.Main,
  },
  iconTitle: {
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: "500",
    width: "100%",
  },
  iconDesc: {
    fontSize: 12,
    width: "100%",
    color: COLORS.DetailsColor,
  },
  error: {
    color: "red",
  },
});
