import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Video, ResizeMode } from "expo-av";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideoPost } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [form,setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt:'',
  });

   const openPicker = async (selectType) => {
     const result = await DocumentPicker.getDocumentAsync({
       type:
         selectType === "image"
           ? ["image/png", "image/jpg","image/jpeg"]
           : ["video/mp4", "video/gif"],
     });

     if (!result.canceled) {
       if (selectType === "image") {
         setForm({
           ...form,
           thumbnail: result.assets[0],
         });
       }

       if (selectType === "video") {
         setForm({
           ...form,
           video: result.assets[0],
         });
       }
     } else {
       setTimeout(() => {
         Alert.alert("Document picked", JSON.stringify(result, null, 2));
       }, 100);
     }
   };

  const submit = async () => {
    if (form.title === "" || !form.video || !form.thumbnail || form.prompt === "") {
      Alert.alert("Warning", "Enter all the fields");
    }
    try {
      //add post to database
      await createVideoPost({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setPrompt("");
      setThumbnail(null);
      setVideo(null);
      setTitle("");
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#161622", height: "100%", padding: 10 }}
    >
      <ScrollView>
        <Text
          style={{
            color: "white",
            fontSize: 21,
            fontWeight: "bold",
            marginTop: 50,
          }}
        >
          Upload Video
        </Text>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderWidth: 1,
            borderRadius: 10,
            width: "100%",
            padding: 10,
            borderColor: "white",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "500",
              marginVertical: 10,
            }}
          >
            Video title
          </Text>
          <TextInput
            style={{
              borderWidth: 2,
              borderRadius: 10,
              width: "100%",
              padding: 10,
              borderColor: "white",
              color: "white",
            }}
            value={form.title}
            placeholder="Enter video title"
            onChangeText={(text) => setForm({...form,title:text})}
            placeholderTextColor="white"
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderWidth: 1,
            borderRadius: 10,
            width: "100%",
            padding: 10,
            borderColor: "white",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "500",
              marginVertical: 10,
            }}
          >
            Video
          </Text>
          <View
            style={{
              borderWidth: 2,
              borderRadius: 10,
              width: "100%",
              padding: 10,
              borderColor: "white",
              color: "white",
            }}
          >
            {form.video ? (
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 200,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
                onPress={() => openPicker("video")}
              >
                <Video
                  source={{ uri: form.video.uri }}
                  resizeMode={ResizeMode.COVER}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  backgroundColor: "#393E41",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity onPress={() => openPicker("video")}>
                  <Image
                    source={require("../../assets/icons/upload.png")}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderWidth: 1,
            borderRadius: 10,
            width: "100%",
            padding: 10,
            borderColor: "white",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "500",
              marginVertical: 10,
            }}
          >
            Thumbnail Image
          </Text>
          <View
            style={{
              borderWidth: 2,
              borderRadius: 10,
              width: "100%",
              padding: 10,
              borderColor: "white",
              color: "white",
            }}
          >
            {form.thumbnail ? (
              <TouchableOpacity onPress={() => openPicker("image")}>
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode="cover"
                  style={{ width: "100%", height: 200 }}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  backgroundColor: "#393E41",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity onPress={() => openPicker("image")}>
                  <Feather name="image" size={60} color="#FFA001" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderWidth: 1,
            borderRadius: 10,
            width: "100%",
            padding: 10,
            borderColor: "white",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "500",
              marginVertical: 10,
            }}
          >
            Video prompt
          </Text>
          <TextInput
            style={{
              borderWidth: 2,
              borderRadius: 10,
              width: "100%",
              padding: 10,
              borderColor: "white",
              color: "white",
            }}
            value={form.prompt}
            placeholder="Enter the prompt you used to create the video"
            onChangeText={(text) => setForm({...form,prompt:text})}
            placeholderTextColor="white"
          />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <CustomButton title="Submit and Publish" handleClick={submit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({});
