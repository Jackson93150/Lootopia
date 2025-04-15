import {
    StyleSheet,
  } from "react-native";

export const styleImage = StyleSheet.create({
    logo: {
      position: "absolute",
      width: 160, 
      height: 160,
      top: -110,
      zIndex: 10,
    },
    banner: {
      position: "absolute",
      width: '113%',
      zIndex: 0,
    },
    chest: {
      position: "absolute",
      height: 200,
      width: 200,
      bottom: 10,
      right: 10,
      zIndex: 5,
    },
  });
  