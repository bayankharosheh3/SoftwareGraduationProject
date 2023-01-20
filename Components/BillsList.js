import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { COLORS } from "../assets/constants";

const Item = ({ name, details, navigation }) => (
  <View>
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  </View>
);

// the filter
const BillsList = ({ searchPhrase, setCLicked, data, navigation }) => {
  const [paid, setPaid] = useState(false);
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <View style={styles.container0}>
          <View style={styles.card}>
            <View style={styles.userInfo}>
              <View style={styles.userImgWrapper}>
                {/* <Image style={styles.userImg} source={{ uri: item. }} /> */}
              </View>
              <View style={styles.textSection}>
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{item.dr_name}</Text>
                  <View>
                    <View style={styles.rateinfo}>
                      <Text style={styles.rate}>{item.dr_bill}$</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.userInfoText}>
                  <Text style={styles.specialty}>{item.app_date}</Text>
                  {item.paid == 0 && (
                    <View style={styles.notPaid}>
                      <Text style={styles.textPaid}>Not Paid</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
    // filter of the name
    if (
      item.dr_name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <View style={styles.container0}>
          <View style={styles.card}>
            <View style={styles.userInfo}>
              <View style={styles.userImgWrapper}>
                {/* <Image style={styles.userImg} source={{ uri: item. }} /> */}
              </View>
              <View style={styles.textSection}>
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{item.dr_name}</Text>
                  <View>
                    <View style={styles.rateinfo}>
                      <Text style={styles.rate}>{item.dr_bill}$</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.userInfoText}>
                  <Text style={styles.specialty}>{item.app_date}</Text>
                  {item.paid == 0 && (
                    <View style={styles.notPaid}>
                      <Text style={styles.textPaid}>Not Paid</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
    // filter of the description
    if (
      item.app_date
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <View style={styles.container0}>
          <View style={styles.card}>
            <View style={styles.userInfo}>
              <View style={styles.userImgWrapper}>
                {/* <Image style={styles.userImg} source={{ uri: item. }} /> */}
              </View>
              <View style={styles.textSection}>
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{item.dr_name}</Text>
                  <View>
                    <View style={styles.rateinfo}>
                      <Text style={styles.rate}>{item.dr_bill}$</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.userInfoText}>
                  <Text style={styles.specialty}>{item.app_date}</Text>
                  {item.paid == 0 && (
                    <View style={styles.notPaid}>
                      <Text style={styles.textPaid}>Not Paid</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      );
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
          keyExtractor={(item) => item.app_id}
        />
      </View>
    </SafeAreaView>
  );
};

export default BillsList;

const styles = StyleSheet.create({
  list__container: {
    padding: 10,
    height: "100%",
    width: "100%",
  },
  item: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
    paddingHorizontal: 10,
    paddingBottom: 20,
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
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginVertical: 7,
  },
  card: {
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  rateinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.InputBackground,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    //marginLeft: 10,
    width: "93%",
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
    paddingRight: 10,
  },
  specialty: {
    fontSize: 14,
    color: "#949494",
  },
  rateimage: {
    width: 17,
    height: 17,
  },
  arrowimg: {
    paddingTop: 13,
    paddingRight: 0,
  },
  notPaid: {
    backgroundColor: "red",
    borderRadius: 3,
    padding: 2,
    paddingHorizontal: 8,
  },
  textPaid: {
    color: COLORS.FontColorWithBackground,
  },
});
