import { StyleSheet } from "react-native";

export const styleSwitch = StyleSheet.create({
	switch: {
		flexDirection: "row",
		alignItems: "center",
		width: "110%",
		justifyContent: "flex-start",
		gap: 5,
		transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
	},
	switchLabel: {
		fontSize: 14,
		color: "#222",
		fontWeight: "600",
	},
});
