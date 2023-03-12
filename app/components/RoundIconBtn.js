import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../misc/colors";

const RoundIconBtn = ({ AntIconName, size, color, style, onPress }) => {
  return (
    <AntDesign
      name={AntIconName}
      size={size || 24}
      color={color || colors.light}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.dark,
    borderRadius: 30,
    height: 25,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    elevation: 5,
  },
});

export default RoundIconBtn;
