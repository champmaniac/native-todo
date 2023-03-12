import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ToDoContex = createContext();
const ToDoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const findToDos = async () => {
    const res = await AsyncStorage.getItem("todos");
    // console.log(res);
    if (res !== null) {
      setTodos(JSON.parse(res));
    }
  };

  useEffect(() => {
    // AsyncStorage.clear();
    findToDos();
  }, []);

  return (
    <ToDoContex.Provider value={{ todos, setTodos, findToDos }}>
      {children}
    </ToDoContex.Provider>
  );
};

const styles = StyleSheet.create({});

export const useToDos = () => useContext(ToDoContex);

export default ToDoProvider;
