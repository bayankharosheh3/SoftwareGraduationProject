import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import { COLORS } from "../assets/constants";
import { useState } from "react";
import { Card } from "react-native-paper";
import { useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useContext } from "react";
import { RoutingData } from "../Components/Context/RoutingDataProvider";

const HistoryPatientItem = ({ item, navigation,route }) => {
  const { width } = useWindowDimensions();
  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [yes, setYes] = useState(false);
  const [value, setValue] = useState("");
  const [answers, setAnswers] = useState([]);
  const id = useRef(0);
  const dataSignIn = useContext(RoutingData);
  const [isLoading, setLoading] = useState(false);
  console.log(dataSignIn.userId);
  //consol.log(item.id);
  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("home")}
        >
          <Text style={styles.text}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.question}</Text>
      </View>
      <View style={styles.imgContainer}>
        <TouchableOpacity
          style={[
            styles.btn1,
            {
              backgroundColor: clicked ? COLORS.white : "#f7f9fc" + 40,
              borderColor: clicked ? "#f7f9fc" + 40 : COLORS.white,
            },
          ]}
          onPress={() => {
            setClicked(true);
            setClicked2(false);
            setYes(false);
          }}
        >
          <Text
            style={[
              styles.subTitle,
              { color: clicked ? COLORS.Main : COLORS.white },
            ]}
          >
            no
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn2,
            {
              backgroundColor: clicked2 ? COLORS.white : "#f7f9fc" + 40,
              borderColor: clicked2 ? "#f7f9fc" + 40 : COLORS.white,
            },
          ]}
          onPress={() => {
            setClicked(false);
            setClicked2(true);
            if (item.id == "4") {
              var Data = {
                p_id:dataSignIn.userId,
              }

              axios
              .post("http://10.0.2.2:80/backend/doctor/smoke.php", Data)
              .then((response) => response.data)
              .then((json) =>{ 
                console.log(json)
              }
              )
              .catch((error) => console.error(error))
              .finally(() => setLoading(false));

              setYes(false);
            } else {
              setYes(true);
            }
          }}
        >
          <Text
            style={[
              styles.subTitle,
              { color: clicked2 ? COLORS.Main : COLORS.white },
            ]}
          >
            Yes
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        {yes && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              placeholder={item.detail}
              style={styles.input}
              // value={item.answers}
              value={value}
              onChangeText={(value) => setValue(value)}
            />
            <TouchableOpacity
              style={{
                width: "15%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                height: 54,
                borderWidth: 0.2,
                borderColor: COLORS.Main,
                borderRadius: 3,
              }}
              onPress={() => {
                setAnswers([...answers, { id: id.current++, answer: value }]);

                var Data = {
                  value:answers,
                  p_id:dataSignIn.userId,
                  q_id:item.id,
                }

                axios
                .post("http://10.0.2.2:80/backend/doctor/add_value.php", Data)
                .then((response) => response.data)
                .then((json) =>{ 
                  console.log(json)
                }
                )
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
                
                console.log(item.id);
                setValue('');
                
              }}
            >
              <Text style={{ fontSize: 30, color: COLORS.Main }}>+</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          style={{ flex: 1, marginBottom: 5 }}
          data={answers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 5 }}>
              <Card style={{ marginHorizontal: 10, marginTop: 5 }}>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text>{item.answer}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          const newArray = answers.filter(
                            (answer) => answer.id !== item.id
                          );
                          setAnswers(newArray);
                        }}
                        style={{ marginRight: 12 }}
                      >
                        <MaterialIcons
                          style={styles.delete}
                          name="delete"
                          size={24}
                          color={COLORS.Main}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HistoryPatientItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Main,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    width: "80%",
    flex: 0.18,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  button: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: COLORS.white, fontSize: 15 },
  textContainer: {
    width: "90%",
    flex: 0.5,
    alignItems: "center",
  },
  imgContainer: {
    // flex: 0.03,
    width: "80%",
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  listContainer: {
    width: "80%",
    marginTop: 20,
    // flex: 0.4,
    // backgroundColor: "red",
    height: "40%",
  },
  btn1: {
    width: "43%",
    backgroundColor: COLORS.Main,
    justifyContent: "center",
    marginRight: 4,
    borderRadius: 4,
    borderColor: COLORS.white,
    borderWidth: 1,
  },
  btn2: {
    width: "43%",
    backgroundColor: COLORS.Main,
    justifyContent: "center",
    borderRadius: 4,
    borderColor: COLORS.white,
    borderWidth: 1,
  },
  image: {
    justifyContent: "center",
    width: "100%",
    height: "80%",
  },

  title: {
    fontWeight: "400",
    fontSize: 24,
    marginTop: 50,
    color: COLORS.white,
    textTransform: "capitalize",
    textAlign: "center",
  },
  subTitle: {
    fontWeight: "300",
    color: COLORS.white,
    marginBottom: 10,
    fontSize: 24,
    textTransform: "capitalize",
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    color: COLORS.FontColorNoBackground,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    height: 54,
    padding: 10,
    borderWidth: 0.2,
    marginBottom: 10,
    backgroundColor: COLORS.InputBackground,
    borderWidth: 0,
    borderBottomColor: COLORS.InputBorder,
    borderBottomWidth: 0.5,
    borderRadius: 5,
  },
});
