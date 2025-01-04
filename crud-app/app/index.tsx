import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colorSheme, theme } from "./_layout";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from '@expo/vector-icons/Feather';
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useTodo } from "@/context/ThemeContext";


export default function Index() {
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const styles = IndexStyles(theme);
  const [todos, setTodos] = useState();
  const [todo, setTodo] = useState("");
  const [todoChanged, setTodoChanged] = useState(false);
  const {refresh} = useTodo();
  const router = useRouter();
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });
  const fetchAllTodos = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.3:3000/api/v1/get-all-todos`
      );
      if (!response) {
        Alert.alert("Something went wrong!");
      }
      const allTodos = await response.json();
      setTodos(allTodos.data);
    } catch (error: any) {
      console.log("error while fetching all todos", error.message);
    }
  };

  const onSubmitTodo = async () => {
    if (!todo) {
      Alert.alert("Todo is required!");
      setTodoChanged(!todoChanged);
      return;
    }
    try {
      const res = await fetch(`http://192.168.1.3:3000/api/v1/add-todo`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: todo }),
      });
      if (!res) {
        Alert.alert("Todo is not created!");
        setTodoChanged(!todoChanged);
      } else {
        Alert.alert("Todo created successfully!");
        setTodo("");
        setTodoChanged(!todoChanged);
      }
    } catch (error: any) {
      console.log("error while adding todo");
      setTodoChanged(!todoChanged);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(
        `http://192.168.1.3:3000/api/v1/delete-todo/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        Alert.alert("Todo deleted successfully!");
        setTodoChanged(!todoChanged);
      } else {
        const errorData = await res.json();
        Alert.alert(
          "Something went wrong!",
          errorData.message || "Unknown error!"
        );
        setTodoChanged(!todoChanged);
      }
    } catch (error: any) {
      Alert.alert("Network error!", "Please check your connection.");
      setTodoChanged(!todoChanged);
    }
  };
  const toggleCompleted = async (id: string, completed: any) => {
    try {
      const res = await fetch(`http://192.168.1.3:3000/api/v1/complete-todo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed: !completed }),
      });
      if (res.ok) {
        const data = await res.json();
        Alert.alert(data.message);
        setTodoChanged(!todoChanged);
      }
    } catch (error: any) {
      Alert.alert("Network error!", "Please check your connection.");
    }
  };

  const handleEdit = (id: string)=> {
    router.push(`/todos/${id}`);
  }

  useEffect(() => {
    fetchAllTodos();
  }, [todoChanged]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Enter your text here..."
          placeholderTextColor={theme.text}
          style={styles.input}
          value={todo}
          onChangeText={(e) => setTodo(e)}
        />
        <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Container>
        <Animated.FlatList
          data={todos}
          keyExtractor={(item) => item?._id}
          ListHeaderComponent={
            <Text
              style={[
                styles.itemText,
                { textAlign: "center", marginVertical: 15, fontSize: 20 },
              ]}
            >
              Todos
            </Text>
          }
          itemLayoutAnimation={LinearTransition}
          keyboardDismissMode="on-drag"
          ListFooterComponent={<View style={{ height: 80 }} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text
                onLongPress={() => toggleCompleted(item._id, item.completed)}
                style={[
                  styles.itemText,
                  {
                    textDecorationLine:
                      item.completed === true ? "line-through" : "none",
                    color: item.completed === true ? "gray" : theme.text,
                  },
                ]}
              >
                {item.title}
              </Text>
              <View style={styles.editSection}>
                <TouchableOpacity onPress={()=> handleEdit(item._id)}>
                  <Feather name="edit" size={20} color={theme.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo(item._id)}>
                  <MaterialIcons name="delete-forever" size={24} color={"red"} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </Container>
      <StatusBar style={colorSheme === "dark" ? "light" : "dark"} />
    </View>
  );
}

export function IndexStyles(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    textInput: {
      flexDirection: "row",
      marginHorizontal: "auto",
      gap: 10,
      marginVertical: 10,
    },
    input: {
      flexBasis: "80%",
      borderWidth: 1,
      borderColor: theme.text,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 4,
      color: theme.text,
      fontFamily: "Inter_500Medium",
    },
    button: {
      backgroundColor: theme.text,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    buttonText: {
      color: colorSheme === "light" ? "white" : "black",
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: theme.text,
      marginHorizontal: 10,
    },
    itemText: {
      color: theme.text,
      fontFamily: "Inter_500Medium",
      flexBasis: "70%"
    },
    editSection: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexBasis: "20%"
    }
  });
}
