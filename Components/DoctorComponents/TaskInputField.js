import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function TaskInputField(props) {
  const [task, setTask] = useState();

  const handleAddTask = (value) => {
    props.addTask(value);
    setTask(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        style={styles.inputField}
        value={task}
        onChangeText={(text) => setTask(text)}
        placeholder={"Write a task"}
        placeholderTextColor={"#fff"}
      />
      <TouchableOpacity onPress={() => handleAddTask(task)}>
        <View style={styles.button}>
          <AntDesign name="plus" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#fff",
    backgroundColor: "#7BC89C",
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    bottom: 20,
    top: 20,
  },
  inputField: {
    color: "#fff",
    height: 50,
    flex: 1,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TaskInputField;
