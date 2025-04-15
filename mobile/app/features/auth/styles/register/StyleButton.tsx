import { StyleSheet } from "react-native";

export const styleButton = StyleSheet.create({
	socialButton: {
		backgroundColor: "#fff",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 50,
		width: "80%",
		marginBottom: 10,
		borderWidth: 5,
		borderColor: "#F6CB9E",

		// Ombre pour iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.5,
		shadowRadius: 4,

		// Ombre pour Android
		elevation: 5,
	},
	socialText: {
		fontWeight: "bold",
		textAlign: "center",
	},
	stepButton: {
		backgroundColor: "#fff",
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 50,
		marginTop: 10,
		width: "60%",
		borderWidth: 5,
		borderColor: "#F6CB9E",

		// Ombre pour iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.5,
		shadowRadius: 4,

		// Ombre pour Android
		elevation: 5,
	},
	stepButtonText: {
		fontWeight: "bold",
		textAlign: "center",
	},
});
