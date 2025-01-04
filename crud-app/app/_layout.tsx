import React from "react";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Appearance } from "react-native";
import { RefreshProvider } from "@/context/ThemeContext";

export const colorSheme = Appearance.getColorScheme();
export const theme = colorSheme === "dark" ? Colors.dark : Colors.light;
export default function RootLayout() {

     return (
          <RefreshProvider>
               <Stack screenOptions={{
                    headerStyle: {
                         backgroundColor: theme.background
                    },
                    headerTintColor: theme.text,
                    headerTitle: "Todo App",
                    headerTitleAlign: "center",
                    headerShadowVisible: false
               }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="todos/[id]" />
               </Stack>
          </RefreshProvider>
     )
}

