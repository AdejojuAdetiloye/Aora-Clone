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
import { getAllPosts, getLatestPosts, searchPosts } from "../../lib/appWrite";
import VideoCard from "../../components/VideoCard";
import Latest from "../../components/Latest";
import { usePathname, router } from "expo-router";
import { useLocalSearchParams } from 'expo-router'
import EmptyList from "../../components/EmptyList";

const Search = () => {
  const { query } = useLocalSearchParams();
  //fetch data from appwrite
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get all posts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await searchPosts(query);
        setPosts(response);
      } catch (error) {
        Alert.alert("Error", "Post not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query]);

 

 

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
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 14, fontWeight: "500", color: "white" }}
                  >
                    search result
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
                  >
                    {query}
                  </Text>
                </View>
                <View>
                  <Image
                    source={require("../../assets/images/logo-small.png")}
                    resizeMode="contain"
                    style={{ width: 40, height: 30 }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderWidth: 1,
                  borderColor: "white",
                  borderRadius: 15,
                  marginVertical: 10,
                  padding: 10,
                  color: "white",
                }}
              >
                <TextInput
                  value={query}
                  onChangeText={(text) => setQuery(text)}
                  placeholder="Enter video search"
                  placeholderTextColor="#CDCDE0"
                  style={{ color: "white", width: 280, padding: 5 }}
                />
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/icons/search.png")}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              
            </View>
          )}
          ListEmptyComponent={() => <EmptyList />}
         
        />
      </View>
    </SafeAreaView>
  );
}

export default Search

const styles = StyleSheet.create({})