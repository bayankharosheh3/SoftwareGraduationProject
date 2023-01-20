import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import Stars from "react-native-stars";
import { COLORS } from "../../assets/constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { RoutingData } from "../../Components/Context/RoutingDataProvider";

import axios from "axios";
const ReviewsScreen = ({ navigation, route }) => {
  const dataSignIn = useContext(RoutingData);
  console.log(dataSignIn.userId);
  const [review, setReview] = useState([]);
  const [isLoading, setLoading] = useState(false);
  var Data = {
    id:dataSignIn.userId,
   
  };
  const getReview = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctors_review.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setReview(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getReview();
  }, []);

  const [doctor, setDoctor] = useState([]);
  const [isLoadingd, setLoadingd] = useState(false);
  const getDoctor = () => {
    axios
      .post("http://10.0.2.2:80/backend/doctor_info.php", Data)
      .then((response) => response.data)
      .then((json) => {
        setDoctor(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingd(false));
  };
  useEffect(() => {
    setLoadingd(true);
    getDoctor();
  }, []);

  const rate = review.avg;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.imgView}>
            <Image style={styles.imgProfile} source={{ uri: doctor.image }} />
          </View>
          <View style={styles.content}>
            <Text style={styles.userName1}>Dr.{doctor.name}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.rate}>{rate}</Text>
          <View style={styles.stars}>
            <Stars
              rating={review.avg}
              count={5}
              half={true}
              spacing={4}
              fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
              emptyStar={
                <Icon
                  name={"star-o"}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon name={"star-half-empty"} style={[styles.myStarStyle]} />
              }
            />
          </View>
        </View>
        <View style={styles.list}>
          <Text style={styles.listTitle}>others Reviews</Text>
          <FlatList
            data={review.review}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View style={styles.userInfo}>
                  <View style={styles.userImgWrapper}>
                    <Image
                      style={styles.userImg}
                      source={require("../../assets/images/1.png")}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <View style={styles.userInfoText}>
                      <Text style={styles.userName}>{}</Text>
                      <View style={styles.ratestar}>
                        <Text style={styles.postTime}>{item.rate}</Text>
                        <Icon name={"star"} style={[styles.myStarStyle1]} />
                      </View>
                    </View>
                    <Text style={styles.messageText}>{item.comment}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 60,
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  container: {
    width: "90%",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "",
    borderBottomColor: COLORS.BorderColor,
    borderBottomWidth: 1,
    flex: 0.1,
  },
  list: {
    flex: 0.8,
    // backgroundColor: "red",
  },

  imgView: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 20,
  },
  imgProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: COLORS.Main,
    borderWidth: 1,
  },
  content: {
    width: "67%",
    marginBottom: 40,
  },
  stars: {
    width: "30%",
    justifyContent: "flex-end",
  },
  userName1: {
    fontSize: 22,
    textTransform: "capitalize",
  },
  specialty: {
    color: COLORS.DetailsColor,
  },
  myStarStyle: {
    color: COLORS.Main,
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontSize: 22,
  },

  myStarStyle1: {
    color: COLORS.Main,
    backgroundColor: "transparent",
    textShadowColor: "black",
    fontSize: 20,
  },
  rate: {
    fontSize: 20,
    color: COLORS.Main,
    fontWeight: "600",
    // width: "15%",
    paddingHorizontal: 5,
    marginRight: 20,
  },
  ratestar: {
    fontSize: 20,
    flexDirection: "row",
  },
  card: {
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  userInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    // fontFamily: "Lato-Regular",
  },
  postTime: {
    fontSize: 20,
    color: "#666",
    color: COLORS.Main,
    // fontFamily: "Lato-Regular",
  },
  messageText: {
    fontSize: 14,
    color: "#333333",
  },
  listTitle: {
    fontSize: 18,
    paddingVertical: 10,
    textTransform: "capitalize",
  },
});
