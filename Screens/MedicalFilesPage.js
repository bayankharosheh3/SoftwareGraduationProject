import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import { COLORS } from "../assets/constants";
import { useState } from "react";

const MedicalFilesPage = () => {
  const [medicalFiles, setMedicalFiles] = useState({
    radiologyResult: { fileName: "", fileUri: "" },
    labTest: { fileName: "", fileUri: "" },
    chronicDisease: { fileName: "", fileUri: "" },
  });
  const pickDocument = async (oKey) => {
    let result = await DocumentPicker.getDocumentAsync({});
    setMedicalFiles({
      ...medicalFiles,
      [oKey]: { ...[oKey], fileName: result.name, fileUri: result.uri },
    });
    console.log(medicalFiles);
  };
  return (
    <View style={styles.main}>
      <View style={styles.firstRow}></View>
      <View style={styles.secondRow}></View>
      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Radiology Result :</Text>
            <Text style={styles.label2}>
              {medicalFiles.radiologyResult.fileName}
            </Text>
          </View>
          <View style={styles.row2Container}>
            <TouchableOpacity
              style={[styles.changeBtn]}
              onPress={() => {
                pickDocument("radiologyResult");
              }}
            >
              <Text style={styles.changeBtnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.change2Btn]}
              onPress={() => {
                setMedicalFiles({
                  ...medicalFiles,
                  radiologyResult: {
                    ...medicalFiles.radiologyResult,
                    fileName: "",
                    fileUri: "",
                  },
                });
              }}
            >
              <Text style={styles.changeBtn2Text}>delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Lab Test :</Text>
            <Text style={styles.label2}>{medicalFiles.labTest.fileName}</Text>
          </View>
          <View style={styles.row2Container}>
            <TouchableOpacity
              style={[styles.changeBtn]}
              onPress={() => {
                pickDocument("labTest");
              }}
            >
              <Text style={styles.changeBtnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.change2Btn]}
              onPress={() => {
                setMedicalFiles({
                  ...medicalFiles,
                  labTest: {
                    ...medicalFiles.labTest,
                    fileName: "",
                    fileUri: "",
                  },
                });
              }}
            >
              <Text style={styles.changeBtn2Text}>delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Chronic_Disease :</Text>
            <Text style={styles.label2}>
              {medicalFiles.chronicDisease.fileName}
            </Text>
          </View>
          <View style={styles.row2Container}>
            <TouchableOpacity
              style={[styles.changeBtn]}
              onPress={() => {
                pickDocument("chronicDisease");
              }}
            >
              <Text style={styles.changeBtnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.change2Btn]}
              onPress={() => {
                setMedicalFiles({
                  ...medicalFiles,
                  chronicDisease: {
                    ...medicalFiles.chronicDisease,
                    fileName: "",
                    fileUri: "",
                  },
                });
              }}
            >
              <Text style={styles.changeBtn2Text}>delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text></Text>
    </View>
  );
};

export default MedicalFilesPage;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  firstRow: {
    width: "100%",
    flex: 0.4,
    backgroundColor: COLORS.Main,
    alignItems: "center",
  },
  secondRow: {
    width: "100%",
    flex: 0.6,
  },
  column: {
    marginTop: 100,
    position: "absolute",
    width: "90%",
    height: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
  },
  row: {
    width: "100%",
    flex: 0.26,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#edf1f7",
    borderBottomWidth: 1,
  },
  rowContainer: {
    // backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    width: "80%",
    paddingBottom: 10,
    borderBottomColor: "#8f9bb3",
    borderBottomWidth: 1,
  },
  row2Container: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  label: {
    // width: "40%",
    textTransform: "capitalize",
    fontSize: 14,
    color: "#8f9bb3",
    paddingRight: 10,
  },
  label2: {
    width: "60%",
    // backgroundColor: "red",
    overflow: "hidden",
    height: 20,
  },
  changeBtn: {
    width: "30%",
    backgroundColor: COLORS.Main,
    borderColor: COLORS.Main,
    borderWidth: 2,
    padding: 7,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 40,
    marginRight: 10,
    marginBottom: 10,
  },
  changeBtnText: {
    fontSize: 14,
    textTransform: "uppercase",
    color: "white",
  },
  change2Btn: {
    width: "30%",
    backgroundColor: COLORS.white,
    borderColor: COLORS.Main,
    borderWidth: 2,
    padding: 7,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 40,
    marginRight: 10,
    marginBottom: 10,
  },
  changeBtn2Text: {
    fontSize: 14,
    textTransform: "uppercase",
    color: COLORS.Main,
  },
});
