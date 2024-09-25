import { StyleSheet, Text, View, ScrollView, Image ,Alert} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link,router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  //Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { user,setUser,isLoggedIn,setIsLoggedIn } = useGlobalContext()

  //sign-in button
  const handleSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Warning", "Enter all fields");
    }
    try {
      await signIn(email,password);
     // i could  set email,password,username to null but i remembered i need to store them in a globbal state to access it in every page
     const currentUser = await getCurrentUser();
     setUser(currentUser);
     setIsLoggedIn(true);
     router.replace("/home");
    } catch(error) {
      Alert.alert("Error",error.message);
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
              Login to Aora
            </Text>
            <View
              style={{
                marginTop: 30,
              }}
            >
              <View>
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
                <CustomButton title="Sign In" handleClick={handleSignIn} />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "white" }}>Don't have an account </Text>
                <Link href="/sign-up">
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#FFA001",
                    }}
                  >
                    Sign up
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

export default SignIn;

const styles = StyleSheet.create({});
