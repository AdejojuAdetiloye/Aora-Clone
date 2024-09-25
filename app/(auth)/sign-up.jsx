import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  //Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);
  const {user,setUser,isLoggedIn,setIsLoggedIn} = useGlobalContext();

  //sign-in button
  const handleSignUp = async () => {
    if (email === "" || password === "" || username === "") {
      Alert.alert("Warning", "Enter all fields");
    }
    try {
      const result = await createUser(email, password, username);
      // i could  set email,password,username to null but i remembered i need to store them in a globbal state to access it in every page
      setUser(response);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView>
        <View>
          <View style={{ marginTop: 100, padding: 20 }}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 115, height: 35 }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Register to Aora
            </Text>
            <View
              style={{
                marginTop: 30,
              }}
            >
              <View>
                <Text style={{ color: "white" }}>Username</Text>
              </View>
              <FormField
                placeholder="Enter your username"
                value={username}
                show={true}
                onChangeText={(text) => {
                  setUsername(text);
                }}
              />
              <View style={{ marginTop: 20 }}>
                <Text style={{ color: "white" }}>Email</Text>
              </View>
              <FormField
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                type="email-address"
              />
              <View style={{ marginTop: 20 }}>
                <Text style={{ color: "white" }}>Password</Text>
              </View>
              <FormField
                placeholder="Enter your password"
                value={password}
                show={show}
                setShow={setShow}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                isPassword={true}
              />
              <View style={{ height: 20 }} />
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <CustomButton title="Sign Up" handleClick={handleSignUp} />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "white" }}>Already have an account </Text>
                <Link href="/sign-in">
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#FFA001",
                    }}
                  >
                    Sign in
                  </Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
