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
import { usePathname,router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);
  const [searchedItem,setSearchedItem] = useState("");
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const { user } = useGlobalContext();

  //fetch data from appwrite
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getAllPosts();
        setPosts(response);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //to get the latest posts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getLatestPosts();
        setLatestPosts(response);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  //methiod to refresh
  const refresh = async () => {
    setRefreshing(true);
    // fetch if theres any new video uploaded
    const result = await getAllPosts();
    setPosts(result);

    setRefreshing(false);
  };



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
                    Welcome back!
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
                  >
                    {user?.username}
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
                <TouchableOpacity onPress={() => {
                  if(!query){
                    Alert.alert("Missing query","input somethig to search from database")
                  }
                  if(pathname.startsWith("/search")) router.setParams({query})
                  else{
                    router.push(`/search/${query}`)
                  }
                }}>
                  <Image
                    source={require("../../assets/icons/search.png")}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <Latest latest={latestPosts} />
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 20,
                  marginBottom: 15,
                  marginLeft: 10,
                }}
              >
                Trending Videos
              </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
