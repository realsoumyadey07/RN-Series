import { Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme, colorSheme } from "../_layout";
import { useTodo } from "@/context/ThemeContext";

export default function EditScreen() {
     const {refresh, setRefresh} = useTodo();
     const { id } = useLocalSearchParams();
     const [todo, setTodo] = useState({});
     const router = useRouter();
     const [loaded, error] = useFonts({
          Inter_500Medium
     })
     if (!loaded && !error) {
          return null;
     }
     const getTodoById = async () => {
          try {
               const response = await fetch(`http://192.168.1.3:3000/api/v1/get-todo/${id}`);
               if (!response) Alert.alert("Something went wrong!");
               const data = await response.json();
               console.log(data.todo);
               setTodo(data.todo);
          } catch (error: any) {
               Alert.alert("Something went wrong!, please check your network connection!")
          }
     }
     const handleUpdateTodo = async () => {
          try {
               const res = await fetch(`http://192.168.1.3:3000/api/v1/edit-todo/${id}`, {
                    method: "PUT",
                    headers: {
                         "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                         title: todo?.title
                    })
               });
               if(!res.ok) {
                    Alert.alert("Something went wrong!");
               } else {
                    Alert.alert("Todo got updated successfully!");
                    setRefresh(!refresh);
                    router.back();
               }
          } catch (error: any) {
               Alert.alert("Something went wrong while updating!");
          }
     }
     useEffect(() => {
          if (id) getTodoById();
     }, [id]);
     return (
          <View style={styles.container}>
               <View style={styles.textInputWrapper}>
                    <TextInput
                    value={todo?.title}
                    onChangeText={(e)=> setTodo({...todo, title: e})}
                         placeholder={todo?.title}
                         style={styles.textInput}
                         placeholderTextColor={theme.text}
                    />
                    <TouchableOpacity onPress={()=> handleUpdateTodo()} style={styles.button}>
                         <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: theme.background,
          paddingHorizontal: 10,
          paddingTop: 15
     },
     textInputWrapper :{
          flexDirection: "row",
          gap: 10,
          marginHorizontal: "auto"
     },
     textInput: {
          height: 40,
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderColor: theme.text,
          borderWidth: 1,
          flexBasis: "80%",
          color: theme.text,
          fontFamily: "Inter_500Medium"
     },
     button: {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.text,
          paddingHorizontal: 10,
          borderRadius: 5,
     },
     buttonText: {
          color: theme.background
     }
})