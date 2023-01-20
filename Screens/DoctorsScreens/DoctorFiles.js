import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import { TextInput } from "react-native-gesture-handler";
import { COLORS } from "../../assets/constants";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

const DoctorFiles = () => {
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

    // alert(result.uri);
    // console.log(result);
  };
  return (
    <View style={styles.main}>
      <View style={styles.firstRow}></View>
      <View style={styles.secondRow}></View>
      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>File 1 :</Text>
            <Text style={styles.label2}>
              {medicalFiles.radiologyResult.fileName}
            </Text>
          </View>
          <View style={styles.row2Container}>
            <TouchableOpacity
              style={[styles.changeBtn]}
              onPress={() => {
                pickDocument("radiologyResult");
                // console.log("done");
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
            <Text style={styles.label}>File 2 :</Text>
            <Text style={styles.label2}>{medicalFiles.labTest.fileName}</Text>
          </View>
          <View style={styles.row2Container}>
            <TouchableOpacity
              style={[styles.changeBtn]}
              onPress={() => {
                pickDocument("labTest");
                // console.log("ok");
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
            <Text style={styles.label}>File 3 :</Text>
            <Text style={styles.label2}>
              {medicalFiles.chronicDisease.fileName}
            </Text>
          </View>
          <View style={styles.row2Container}>
            <TouchableOpacity
              style={[styles.changeBtn]}
              onPress={() => {
                pickDocument("chronicDisease");
                // console.log("done");
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
      {/* <Button title="”Select Document”" onPress={() => pickDocument()} /> */}
    </View>
  );
};

export default DoctorFiles;

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
    // backgroundColor: COLORS.white,
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
    // backgroundColor: "red",
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
