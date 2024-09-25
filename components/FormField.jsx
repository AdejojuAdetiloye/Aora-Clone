import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const FormField = ({ placeholder, value, isPassword, onChangeText, type,show,setShow }) => {
    

  const togglePassword = () => {
    setShow(!show);
    !isPassword;
  };
  return (
    <View
      style={{
        backgroundColor: "#393E41",
        width: "100%",
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TextInput
        style={{ color: "white", paddingLeft: 10, fontSize: value ? 15 : 15 }}
        placeholder={placeholder}
        placeholderTextColor={{color:"white"}}
        value={value}
        secureTextEntry={show ? isPassword : !isPassword}
        onChangeText={onChangeText}
        keyboardType={type}
      />
      {isPassword && (
        <TouchableOpacity onPress={togglePassword}>
          {show ? (
            <Image
              source={require("../assets/icons/eye-hide.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../assets/icons/eye.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormField;
