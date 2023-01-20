import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import star from "../assets/images/star.png";
import chat from "../assets/images/chat.png";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </View>
);

// the filter
const DoctorsList = ({ searchPhrase, setCLicked, data, navigation }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <View style={styles.container0}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("doctor_appointments", {
                userName: item.doctor_name,
              })
            }
          >
            <View style={styles.userInfo}>
              <View style={styles.userImgWrapper}>
                <Image style={styles.userImg} source={{ uri: item.image }} />
              </View>
              <View style={styles.textSection}>
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{item.doctor_name}</Text>
                  <View>
                    <View style={styles.rateinfo}>
                      <Text style={styles.rate}>{item.rate}</Text>
                      <Image source={star} style={styles.rateimage} />
                    </View>
                  </View>
                </View>
                <View style={styles.userInfoText}>
                  <Text style={styles.specialty}>{item.specialty}</Text>
                  <TouchableOpacity
                    style={styles.chatimg}
                    onPress={() =>
                      navigation.navigate("chat", {
                        userName: item.doctor_name,
                      })
                    }
                  >
                    <Image source={chat} style={styles.rateimage} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    // filter of the name
    if (
      item.doctor_name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.doctor_name} details={item.specialty} />;
    }
    // filter of the description
    if (
      item.specialty
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.doctor_name} details={item.specialty} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default DoctorsList;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
  container0: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  card: {
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rateinfo: {
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
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Lato-Regular",
  },
  rate: {
    fontSize: 17,
    color: "#7BC89C",
    fontWeight: "bold",
    // fontFamily: "Lato-Regular",
  },
  specialty: {
    fontSize: 14,
    color: "#949494",
  },
  rateimage: {
    width: 20,
    height: 20,
  },
  chatimg: {
    paddingTop: 10,
  },
});
