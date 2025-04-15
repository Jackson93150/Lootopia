import {
    StyleSheet,
  } from "react-native";

export const styleScreen = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '90%',
    height: '70%',
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    padding: 20
  },
  titleRegister: {
    paddingBottom: 30,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',

    // Ombre pour iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    // Ombre pour Android
    elevation: 5,
  }
});
