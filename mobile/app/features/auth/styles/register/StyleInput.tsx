import { StyleSheet } from "react-native";

export const styleInput = StyleSheet.create({
	inputGroup: {
		width: "100%",
		marginBottom: 15,
	},
	label: {
		marginBottom: 5,
		fontWeight: "600",
		color: "#222",
	},
	input: {
		backgroundColor: "#F6F6F6",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 15,
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
});
