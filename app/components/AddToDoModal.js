import {
  Modal,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";

const AddToDoModal = ({ visible, onClose, onSubmit, toDo, isEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(toDo.title);
      setDesc(toDo.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  // console.log(title, desc);

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            value={title}
            placeholder="Title"
            style={[styles.Input, styles.Title]}
            onChangeText={(text) => handleOnChangeText(text, "title")}
          />
          <TextInput
            multiline
            value={desc}
            placeholder="Description"
            style={[styles.Input, styles.Desc]}
            onChangeText={(text) => handleOnChangeText(text, "desc")}
          />
          <View style={styles.btn}>
            <RoundIconBtn
              AntIconName="check"
              style={styles.check}
              onPress={handleSubmit}
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                AntIconName="close"
                style={styles.close}
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  Input: {
    borderBottomColor: colors.dark,
    borderBottomWidth: 2,
    fontFamily: "Roboto",
    fontSize: 18,
    color: colors.dark,
    // fontWeight: "bold",
  },
  Title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
    // borderRadius: 5,
  },
  Desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    // opacity: 0.5,
    zIndex: -1,
  },
  btn: {
    // backgroundColor: colors.dark,
    flexDirection: "row",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  check: {
    backgroundColor: "green",
    paddingLeft: 3,
    paddingBottom: 5,
    borderRadius: 5,
    // marginRight: 10,
  },
  close: {
    backgroundColor: "red",
    paddingLeft: 3,
    paddingBottom: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default AddToDoModal;
