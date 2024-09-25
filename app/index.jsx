import { StyleSheet, Text, ScrollView, View, Image } from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/GlobalProvider";

const App = () => {
//get access to useGlobalContext
const {isLoggedIn,isLoading} = useGlobalContext();


  const handleClick = () => {
    router.push("/sign-in")
  };

  //check if user is logged in already
  if(!isLoading && isLoggedIn) return <Redirect href ="/home" />
  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView style={{padding:20}}>
        <View style={{ alignItems: "center", justifyContent: "center", marginTop:20 }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{ width: 130, height: 84 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("../assets/images/cards.png")}
              style={{ maxWidth: 380, height: 300 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              Discover endless possibilities with
              <Text style={{ color: "#FFA001" }}> Aora</Text>
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              width: 380,
            }}
          >
            <View style={{ width: "50%" }}></View>
            <Image
              source={require("../assets/images/path.png")}
              style={{
                width: 136,
                height: 15,
                marginLeft: 200,
              }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 16,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Where creativity meets innovation: embark on a journey of
              limitless exploration with Aora
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent:"center",width:"100%" }}>
            <CustomButton
              title="Continue with Email"
              handleClick={handleClick}
            />
          </View>
          <StatusBar backgroundColor="#161622" style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
