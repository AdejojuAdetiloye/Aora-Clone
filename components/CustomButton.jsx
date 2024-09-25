import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title,handleClick }) => {
  return (
    <TouchableOpacity
      onPress={handleClick}
      style={{ backgroundColor: "#FFA001",padding:13,marginHorizontal:10,marginTop:20,width:"100%" ,alignItems:"center",justifyContent:"center",borderRadius:15,}}
    >
      <Text style={{color:"black",fontSize:15,fontWeight:"bold"}}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton

const styles = StyleSheet.create({})