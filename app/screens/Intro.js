import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import colors from "../misc/colors";
import RoundIconBtn from "../components/RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({ onFinish }) => {
  const [name, setName] = useState("");
  const handleOnChangeText = (text) => {
    setName(text);
  };
  // console.log(user);
  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem("user", JSON.stringify(user)); // since AsyncStorage only accepts strings, we need to convert our object to a string
    if (onFinish) onFinish();
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.text}>Enter your name to continue...</Text>
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="Enter your name"
          style={styles.TextInput}
        />
        {name.trim().length >= 3 ? (
          <RoundIconBtn AntIconName="arrowright" onPress={handleSubmit} />
        ) : null}
      </View>
    </>
  );
};

const width = Dimensions.get("window").width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.black,
    fontSize: 25,
    fontWeight: "bold",
    // alignSelf: "flex-start",
    paddingLeft: 5,
    marginBottom: 5,
    opacity: 0.5,
  },
  TextInput: {
    borderColor: colors.black,
    borderWidth: 2,
    width,
    height: 40,
    paddingLeft: 10,
    margin: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    fontSize: 25,
  },
});

export default Intro;
