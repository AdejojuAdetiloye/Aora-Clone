import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor:"#161622",
            height:60
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome name="home" size={size} color={color} focused />
            ),
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontWeight: "bold" }}>Home</Text>
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name="create" size={size} color={color} />
            ),
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontWeight: "bold" }}>Create</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome name="bookmark" size={size} color={color} focused />
            ),
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontWeight: "bold" }}>Bookmark</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome6 name="person" size={size} color={color} />
            ),
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontWeight: "bold" }}>Profile</Text>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
