import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Intro from "./app/screens/Intro";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ToDoItems from "./app/components/ToDoItems";
import TodoScreen from "./app/screens/TodoScreen";
import ToDoProvider from "./app/context/ToDoProvider";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    // console.log(result);

    if (result === null) return setIsAppFirstTimeOpen(true);
    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };
  useEffect(() => {
    findUser();
    // AsyncStorage.clear();
  }, []);

  const RenderTodoScreen = (props) => <TodoScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  else
    return (
      <NavigationContainer>
        <ToDoProvider>
          <Stack.Navigator
            screenOptions={{ headerTitle: "", headerTransparent: true }}
          >
            <Stack.Screen name="ToDoScreen" component={RenderTodoScreen} />
            <Stack.Screen name="ToDoItems" component={ToDoItems} />
          </Stack.Navigator>
        </ToDoProvider>
      </NavigationContainer>
    );
  // return <Intro />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
