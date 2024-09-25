import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { Video,ResizeMode } from 'expo-av'

const VideoCard = ({ item }) => {
  const [play, setPlay] = useState(false);
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 5,
        justifyContent: "center",
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, width: "70%" }}>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20 }}>
            <Image
              source={{ uri: item.creator.avatar }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "column", marginVertical: 10 }}>
            <Text style={{ color: "white" }}>{item.title}</Text>
            <Text style={{ color: "white" }}>{item.creator.username}</Text>
          </View>
        </View>
        <Image
          source={require("../assets/icons/menu.png")}
          style={{ width: 30, height: 30 }}
          resizeMode="contain"
        />
      </View>
      {play ? (
        <TouchableOpacity onPress={() => setPlay(!play)}>
          <Video
            source={{ uri: item.video }}
            style={{ width: "100%", height: 200, borderRadius: 20 }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay={true}
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setPlay(true);
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={{ width: "100%", height: 200, borderRadius: 15 }}
            resizeMode="cover"
          />
          <Image
            source={require("../assets/icons/play.png")}
            style={{
              width: 40,
              height: 40,
              position: "absolute",
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({});
