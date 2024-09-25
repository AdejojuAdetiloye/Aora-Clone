import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  Pressable,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Trending from "../../components/Trending";
import {
  getAllPosts,
  getLatestPosts,
  getUserhPosts,
  searchPosts,
  signOut,
} from "../../lib/appWrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams,router } from "expo-router";
import EmptyList from "../../components/EmptyList";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { query } = useLocalSearchParams();
  //fetch data from appwrite
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext();

  //get all user posts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getUserhPosts(user.$id);
        setPosts(response);
      } catch (error) {
        Alert.alert("Error", "Post not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query]);

  //method to logout
  const logout = async() => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <View style={{ margin: 8 }}>
        <FlatList
          style={{ marginTop: 50 }}
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <>
              <VideoCard item={item} />
            </>
          )}
          ListHeaderComponent={() => (
            <View>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 1 }} />

                <TouchableOpacity onPress={logout}>
                  <Image
                    source={require("../../assets/icons/logout.png")}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderWidth: 2,
                    borderColor: "#FFA001",
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: user?.avatar }}
                    style={{ width: "90%", height: "90%", borderRadius: 15 }}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "900",
                      marginTop: 10,
                    }}
                  >
                    {user?.username}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      {posts.length}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 17,
                        fontWeight: "500",
                      }}
                    >
                      Posts
                    </Text>
                  </View>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      50k
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 17,
                        fontWeight: "500",
                      }}
                    >
                      Followers
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => <EmptyList />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
