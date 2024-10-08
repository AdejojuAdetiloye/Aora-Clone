import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";



const SignIn = () => {
  //Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // Handle notifications received while the app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    return () => {
      notificationListener.remove();
    };
  }, []);

  // Function to send a push notification
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Login Alert",
      body: "You have successfully logged in!",
      data: {
        someData: "Welcome back to Aora - the no: 1 AI video streaming ",
      },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  //method to register for push notifications
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  //sign-in button
  const handleSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Warning", "Enter all fields");
    }
    try {
      await signIn(email, password);
      // i could  set email,password,username to null but i remembered i need to store them in a globbal state to access it in every page
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsLoggedIn(true);
      sendPushNotification(expoPushToken);
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
