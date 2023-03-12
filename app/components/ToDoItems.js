import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToDos } from "../context/ToDoProvider";
import AddToDoModal from "./AddToDoModal";
// import { useHeaderHeight } from "@react-navigation/stack";

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const mins = date.getMinutes();
  const secs = date.getSeconds();
  return `${day}/${month}/${year} -  ${hrs}:${mins}:${secs}`;
};

const ToDoItems = (props) => {
  // const { toDo } = props.route.params;
  const [toDo, setToDo] = useState(props.route.params.toDo);
  // const headerHeight = useHeaderHeight();
  const { setTodos } = useToDos();

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteToDo = async () => {
    const res = await AsyncStorage.getItem("todos");
    let todos = [];
    if (res !== null) {
      todos = JSON.parse(res);
    }

    const newTodos = todos.filter((t) => t.id !== toDo.id);
    setTodos(newTodos);
    await AsyncStorage.setItem("todos", JSON.stringify(newTodos));

    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are you sure?",
      "This action will delete your ToDo permanently.",
      [
        {
          text: "Delete",
          onPress: deleteToDo,
          style: "cancel",
        },
        {
          text: "No, Thanks",
          onPress: () => {
            console.log("No thanks, Pressed");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    const res = await AsyncStorage.getItem("todos");
    let todos = [];
    if (res !== null) todos = JSON.parse(res);

    const newToDos = todos.filter((t) => {
      if (t.id === toDo.id) {
        t.title = title;
        t.desc = desc;
        t.isUpdated = true;
        t.time = time;

        setToDo(t);
      }
      return t;
    });

    setTodos(newToDos);
    await AsyncStorage.setItem("todos", JSON.stringify(newToDos));
  };

  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.time}>
          {toDo.isUpdated
            ? `Last updated At ${formatDate(toDo.time)}`
            : `Created At ${formatDate(toDo.time)}`}
        </Text>
        <Text style={styles.title}>{toDo.title}</Text>
        <Text style={styles.desc}>{toDo.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          AntIconName="delete"
          style={styles.btnDelete}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn
          AntIconName="edit"
          style={styles.btnEdit}
          onPress={openEditModal}
        />
      </View>
      <AddToDoModal
        isEdit={isEdit}
        toDo={toDo}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  btnContainer: {
    flexDirection: "column",
    position: "absolute",
    right: 15,
    bottom: 1,
    zIndex: 1,
    borderRadius: 50,
    padding: 12,
  },
  btnDelete: {
    backgroundColor: colors.error,
    borderRadius: 50,
    padding: 12,
    width: 50,
    height: 50,
    justifyContent: "center",
    marginBottom: 10,
  },
  btnEdit: {
    backgroundColor: colors.dark,
    borderRadius: 50,
    padding: 12,
    width: 50,
    height: 50,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginBottom: 10,
    color: colors.dark,
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
    // marginTop: 10,
  },
  time: {
    fontSize: 12,
    textAlign: "right",
    marginBottom: 10,
    opacity: 0.5,
    color: colors.dark,
    marginBottom: 10,
  },
});

export default ToDoItems;
