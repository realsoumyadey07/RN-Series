import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import React from "react";

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={require("@/assets/images/coffee-splash.png")}
        resizeMode="cover"
      >
        <Text style={styles.text}>First have a Coffee!</Text>
        <Link href="/contact" asChild style={{ marginTop: 40 }}>
          <Pressable style={styles.button}>
            <Text style={{ color: "white" }}>Explore Us</Text>
          </Pressable>
        </Link>
        <Link href="/menu" asChild style={{ marginTop: 40 }}>
          <Pressable style={styles.button}>
            <Text style={{ color: "white" }}>Our Menu</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 40,
    fontWeight: "bold",
  },
  backImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#fc9d30",
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: "center",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  }
});
