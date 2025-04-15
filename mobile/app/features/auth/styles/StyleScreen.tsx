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
  or: {
    marginVertical: 10,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,

    // Ombre pour iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    // Ombre pour Android
    elevation: 5,
  },
  forgot: {
    marginTop: 5,
    color: "#00000",
    fontSize: 12,
    textAlign: "right",
  },
  noAccount: {
    marginTop: 10,
    fontWeight: "600",
    color: "#FFFFFF",

    // Ombre pour iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    // Ombre pour Android
    elevation: 5,
  },
});
