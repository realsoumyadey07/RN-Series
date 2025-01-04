import { View, Text } from 'react-native'
import React from 'react'
import Home from './src/screens/Home'



export default function App() {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Hello World!</Text>
      <Home/>
    </View>
  )
}