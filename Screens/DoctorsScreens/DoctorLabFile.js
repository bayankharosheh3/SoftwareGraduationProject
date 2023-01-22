import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const DoctorLabFile = ({ route }) => {
  console.log(route.params.link);
  return (
    <WebView
      source={{
        uri: "https://drive.google.com/file/d/1mafrAlW5weKckc5LNJeuboULmCOL0B07/view?usp=sharing",
      }}
    />
  );
};

export default DoctorLabFile;

const styles = StyleSheet.create({});
