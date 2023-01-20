import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../assets/constants";

const HomeCard = ({ navigation, card }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => navigation.navigate(card.cardScreen)}
    >
      <View style={styles.imgContainer}>
        <Image source={card.cardIcon} style={styles.imgCard} />
      </View>
      <Text style={{width:'100%'}}>{card.cardTitle}</Text>
      <Text style={styles.sub}>{card.cardSubTitle}</Text>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 0.5 * SIZES.width - 35,
    margin: 10,
    height: 155,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#9e9898",
    elevation: 5,
    alignItems:'center',
  },
  imgContainer:{
    width:'60%',
    flex:4.5,
    backgroundColor: COLORS.InputBackground,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:10,
  },
  imgCard: {
    width: "160%",
    resizeMode: "cover",
    flex: 1,
  },
  sub: {
    fontSize: 11,
    width: "100%",
    marginBottom: 4,
    marginTop: 2,

    color: COLORS.DetailsColor,
  },
});
