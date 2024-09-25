import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Video, ResizeMode } from "expo-av";
import LatestVideoCard from "./LatestVideoCard";

const LatestPosts = ({ latest }) => {
  

  return (
    <View style={{ gap: 10, margin: 10 }}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Latest Videos
      </Text>
      <FlatList
        data={latest}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <LatestVideoCard item={item} />
        )}
        horizontal
      />
    </View>
  );
};

export default LatestPosts;

const styles = StyleSheet.create({});
