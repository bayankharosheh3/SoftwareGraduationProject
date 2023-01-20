import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import OnBoardingItem from "../Components/OnBoardingItem";
import Paginator from "../Components/Paginator";
import NextButton from "../Components/NextButton";
import slides from "./../assets/data/slides";
import { COLORS } from "../assets/constants";

export default OnBoarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    console.log(currentIndex);
    console.log(slides.length);
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("SignInScreen");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 5 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <OnBoardingItem item={item} navigation={navigation} />
          )}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.slideId}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={styles.btnContainer}>
        <Paginator data={slides} scrollX={scrollX} />
        <NextButton scrollTo={scrollTo} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: COLORS.Background,
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
  btnContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingBottom: 35,
  },
});
