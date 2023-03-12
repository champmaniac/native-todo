import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import AddToDoModal from "../components/AddToDoModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToDo from "../components/ToDo";
import { useToDos } from "../context/ToDoProvider";
import NotFound from "../components/NotFound";

// reverse the order of toDo items logic

const reverseData = (data) => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};
const TodoScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [resultNotFound, setResultNotFound] = useState(false);

  const { todos, setTodos, findToDos } = useToDos();

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) {
      return setGreet("Morning");
    } else if (hrs == 1 || hrs < 18) {
      return setGreet("Afternoon");
    } else {
      return setGreet("Evening");
    }
  };

  useEffect(() => {
    // AsyncStorage.clear();
    findGreet();
  }, []);

  const reverseToDos = reverseData(todos);

  const handleOnSubmit = async (title, desc) => {
    const todo = { id: Date.now(), title, desc, time: new Date() };
    // console.log(todo);
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const openToDo = (toDo) => {
    navigation.navigate("ToDoItems", { toDo });
  };

  const handleOnSearch = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNotFound(false);
      return await findToDos();
    }
    const filterToDos = todos.filter((todo) => {
      if (todo.title.toLowerCase().includes(text.toLowerCase())) {
        return todo;
      }
    });

    if (filterToDos.length) {
      setTodos([...filterToDos]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await findToDos();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.light} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet}, ${user.name}`}</Text>
          {todos.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearch}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />
          ) : null}
          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={reverseToDos}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 15,
              }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ToDo onPress={() => openToDo(item)} item={item} />
              )}
            />
          )}
          {!todos.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add ToDo</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        AntIconName="plus"
        style={styles.addBtn}
      />
      <AddToDoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  addBtn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: colors.dark,
    padding: 12,
    position: "absolute",
    bottom: 50,
    right: 15,
    zIndex: 1,
  },
});

// const styles = StyleSheet.create({
//   header: {
//     fontSize: 25,
//     fontWeight: "bold",
//   },
//   container: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     flex: 1,
//     zIndex: 1,
//   },
//   emptyHeaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   emptyHeader: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: colors.dark,
//     textTransform: "uppercase",
//     opacity: 0.2,
//   },
//   RoundIconBtn: {
//     width: 50,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 50,
//     backgroundColor: colors.dark,
//     padding: 12,
//     position: "absolute",
//     bottom: 50,
//     right: 15,
//     zIndex: 1,
//   },
// });

export default TodoScreen;
