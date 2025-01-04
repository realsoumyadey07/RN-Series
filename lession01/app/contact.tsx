import { ImageBackground, StyleSheet, Text, View } from "react-native";
import CoffeeBackImage from "@/assets/images/iced-coffee.png";
import React from "react";

export default function Explore(){
  return (
    <View style={styles.container}>
      <ImageBackground 
      style={styles.backImage} 
      source={CoffeeBackImage}
      resizeMode="cover"
      >
        <Text style={styles.text}>Coffe Shop</Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  },
  backImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
})