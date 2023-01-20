import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import Paginator from "../Components/Paginator";
import NextButton from "../Components/NextButton";
import { COLORS } from "../assets/constants";
import HistoryPatientItem from "../Components/HistoryPatientItem";

export default PatientHistory = ({ navigation }) => {
  const History = [
    {
      id: "1",
      question: "Do you ever have past surgeries & hospitalizations?",
      detail: "List them with dates, Please?",
    },
    {
      id: "2",
      question: "Do you have any chronic diseases?",
      detail: "List them, Please?",
    },
    {
      id: "3",
      question: "Do you take any kind of medication?",
      detail: "List them, Please?",
    },
    {
      id: "4",
      question: "Do you or did you smoke?",
      detail: "",
    },
    {
      id: "5",
      question:
        "Are there any diseases or medical problems that run in your family?",
      detail: "List them, Please?",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    console.log(currentIndex);
    console.log(History.length);
    if (currentIndex < History.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("home");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={[styles.container1]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <View style={{ flex: 5 }}>
            <FlatList
              data={History}
              renderItem={({ item }) => (
                <HistoryPatientItem item={item} navigation={navigation} />
              )}
              horizontal
              showsHorizontalScrollIndicator
              pagingEnabled
              bounces={false}
              keyExtractor={(item) => item.id}
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
            <Paginator data={History} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
  container1: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.Background,
    position: "relative",
  },
});
