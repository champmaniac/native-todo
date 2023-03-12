import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const NotFound = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <AntDesign name="frowno" size={90} color="black" />
      <Text style={styles.text}>No Data Found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
    zIndex: -1,
    // backgroundColor: "#fff",
  },
  text: {
    fontSize: 30,
    // color: "black",
    // textAlign: "center",
    marginTop: 20,
  },
});

export default NotFound;
