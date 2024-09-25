import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton';
import { router  } from "expo-router"

const EmptyList = () => {
  return (
    <View style={{alignItems:"center",justifyContent:"center"}}>
      <Image
        source={require("../assets/images/empty.png")}
        style={{width:300,height:300}}
        resizeMode="contain"
      />
      <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
        There are no videos yet
      </Text>
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        Be the first to upload a video
      </Text>
      <CustomButton title="Upload a video" handleClick={() => router.push("/create")} />
    </View>
  );
}

export default EmptyList

const styles = StyleSheet.create({})