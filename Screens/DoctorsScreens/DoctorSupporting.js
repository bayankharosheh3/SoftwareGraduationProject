import { StyleSheet, Text, View } from "react-native";
import React from "react";
import data from "../../assets/data/supportingData";
import Accordian from "../../Components/Accordion";

const DoctorSupporting = () => {
  console.log(data);
  return (
    <View>
      {data.map((item) => (
        <Accordian title={item.title} data={item.data} />
      ))}
    </View>
  );
};

export default DoctorSupporting;

const styles = StyleSheet.create({});
