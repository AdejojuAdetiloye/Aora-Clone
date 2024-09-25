import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import { Video, ResizeMode } from "expo-av";

const LatestVideoCard = ({item}) => {

    const [play, setPlay] = useState(false);

    //method to play video

    const handlePlay = () => {
      setPlay(!play);
    };
  return (
    <View>
      <TouchableOpacity
        onPress={handlePlay}
        style={{
          width: 140,
          height: 220,
          borderWidth: 1,
          borderRadius: 15,
          margin: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {play ? (
          <Video
            source={{ uri: item.video }}
            style={{ width: 140, height: 220, borderRadius: 20 }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay={true}
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        ) : (
          <>
            <Image
              source={{ uri: item.thumbnail }}
              style={{ width: 140, height: 220, borderRadius: 20 }}
              resizeMode="cover"
            />
            <Image
              source={require("../assets/icons/play.png")}
              style={{ width: 30, height: 30, position: "absolute" }}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default LatestVideoCard

const styles = StyleSheet.create({})