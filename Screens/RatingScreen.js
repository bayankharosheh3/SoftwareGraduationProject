import React, { useState, useEffect } from "react";
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
  SafeAreaView,
} from "react-native";
import nonfillablestar from "./../assets/images/nonfillablestar.png";
import fillablestar from "./../assets/images/fillablestar.png";
import axios from "axios";

function StarRating({ navigation, route }) {
  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(0);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const NONFILL_IMAGE = Image.resolveAssetSource(nonfillablestar).uri;
  const FILL_IMAGE = Image.resolveAssetSource(fillablestar).uri;
  //const user = "https://reactjs.org/logo-og.png";
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [signUpWith, setSignUpWith] = useState({
    id: "",
    comment: "",
    rate: "",
  });
  console.log(route.params.app_id);
  var Data = {
    comment: signUpWith.comment,
    rate: defaultRating,
    id: route.params.dr_id,
    app_id: route.params.app_id,
  };
  const getDoctor = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor_info.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setDoctor(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getDoctor();
  }, []);
  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? { uri: FILL_IMAGE }
                    : { uri: NONFILL_IMAGE }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.container1_2}>
            <Text style={styles.headertext}>Give feedback</Text>
          </View>
        </View>

        <View style={styles.container2}>
          <View style={styles.userImgWrapper}>
            <Image style={styles.userImg} source={{ uri: doctor.image }} />
          </View>
          <View style={styles.container2_1}>
            <Text style={styles.doctorname}>{doctor.name}</Text>
          </View>
          <SafeAreaView style={styles.container2_1}>
            <View style={styles.container2_1}>
              <CustomRatingBar />
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.container3}>
          <View style={styles.container3_1}>
            <Text style={styles.feedbacktitle}>Write your feedback Please</Text>
          </View>
          <View style={styles.container3_2}>
            <TextInput
              placeholder={"Comment"}
              style={styles.input}
              multiline={true}
              value={signUpWith.Email}
              onChangeText={(text) => {
                setSignUpWith({ ...signUpWith, comment: text });
              }}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonStyle}
              onPress={() => {
                setSignUpWith({ ...signUpWith, rate: defaultRating });

                axios
                  .post("http://10.0.2.2:80/backend/review.php", Data)
                  .then((response) => response.data)
                  .then((json) => {
                    //  setError(json);
                    if (json == "Complete") {
                      alert("thanks for your feedback");
                      //goback to past appointments
                    } else {
                      alert(json);
                    }
                  })
                  .catch((error) => console.error(error))
                  .finally(() => setLoading(false));


                  axios
                  .post("http://10.0.2.2:80/backend/doctorrate.php")
                  .then((response) => response.data)
                  .then((json) => {
                  
                  })
                  .catch((error) => console.error(error))
                  .finally(() => setLoading(false));

                console.log(signUpWith);
                navigation.replace("Home")
              }}
            >
              <Text style={styles.buttonTextStyle}>SEND FEEDBACK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.replace("Appointment")}>
              <Text style={styles.link}>No Thanks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: "100%",
    backgroundColor: "#fff",
  },
  container1: {
    flex: 0.3,
    width: "100%",
    backgroundColor: "#7BC89C",
  },
  container1_1: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "12%",
    backgroundColor: "#7BC89C",
  },
  container1_2: {
    flex: 1,
    backgroundColor: "#7BC89C",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  container2: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  container3_1: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "5%",
    paddingTop: "5%",
    paddingBottom: 5,
  },
  container3_2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container3: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },

  feedbacktitle: {
    color: "#666967",
    fontSize: 15,
  },
  input: {
    width: "90%",
    height: 88,
    padding: 10,
    borderWidth: 0.2,
    borderColor: "#b8dec7",
    marginBottom: 10,
    backgroundColor: "#f7faf9",
  },
  link: {
    fontWeight: "bold",
    color: "#7BC89C",
  },
  login_button: {
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "#7BC89C",
    marginBottom: 10,
    backgroundColor: "#7BC89C",
  },
  headertext: {
    color: "white",
    fontSize: 25,
  },
  logindiscreption: {
    color: "white",
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

  container2_1: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 23,
    color: "#000",
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    marginTop: 15,
  },
  doctorname: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  buttonStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
    padding: 15,
    backgroundColor: "#7BC89C",
  },
  buttonTextStyle: {
    width: "90%",
    color: "#fff",
    textAlign: "center",
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  userImgWrapper: {
    alignItems: "center",
    paddingTop: 30,
  },
  userImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default StarRating;
