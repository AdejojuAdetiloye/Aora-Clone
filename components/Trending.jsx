import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import EmptyList from './EmptyList'

const Trending = ({ posts }) => {
  return (
    <View style={{}}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        {" "}
        Trending Videos
      </Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text style={{ color: "white" }}>{item.id}</Text>
        )}
        ListEmptyComponent={() => <EmptyList />}
        horizontal
      />
    </View>
  );
}

export default Trending

const styles = StyleSheet.create({})