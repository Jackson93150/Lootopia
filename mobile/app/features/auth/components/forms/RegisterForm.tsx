import {
	Alert,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { useState } from "react";

export default function RegisterForm() {
	const [stepView, setStepView] = useState<"form" | "cgu">("form");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [pseudo, setPseudo] = useState("");
	const [consentCookie, setConsentCookie] = useState(false);
	const [acceptCGU, setAcceptCGU] = useState(false);
	const toggleSwitchCookie = () => setConsentCookie((prev) => !prev);
	const toggleSwitchCGU = () => setAcceptCGU((prev) => !prev);

	const formIsValid = () => {
		return (
			email.trim() !== "" &&
			password.trim() !== "" &&
			confirmPassword.trim() !== "" &&
			pseudo.trim() !== "" &&
			password === confirmPassword &&
			acceptCGU
		);
	};

	const handleSubmit = () => {
		if (formIsValid()) {
			// nextStep();
		} else {
			Alert.alert("Form error", "Les champs sont incorrects, ou invalides.");
		}
	};

	return (
		<>
			{stepView === "form" && (
				<>
					<Text className="text-white font-bold text-[25px] shadow-xl">Inscription</Text>

					<View className="w-full mb-[15px]">
						<Text className="mb-[5px] font-semibold text-[#222]">Pseudo</Text>
						<TextInput
							placeholder="Pseudo"
							placeholderTextColor="#888"
							className="bg-[#F6F6F6] rounded-[10px] py-[10px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
							value={pseudo}
							onChangeText={setPseudo}
						/>
					</View>

					<View className="w-full mb-[15px]">
						<Text className="mb-[5px] font-semibold text-[#222]">Email</Text>
						<TextInput
							placeholder="Email"
							placeholderTextColor="#888"
							className="bg-[#F6F6F6] rounded-[10px] py-[10px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
							value={email}
							onChangeText={setEmail}
						/>
					</View>

					<View className="w-full mb-[15px]">
						<Text className="mb-[5px] font-semibold text-[#222]">Password</Text>
						<TextInput
							placeholder="Passwezaezaord"
							placeholderTextColor="#888"
							secureTextEntry
							className="bg-[#F6F6F6] rounded-[10px] py-[10px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
							value={password}
							onChangeText={setPassword}
						/>
						<TextInput
							placeholder="Confirm you'r password"
							placeholderTextColor="#888"
							secureTextEntry
							className="bg-[#F6F6F6] rounded-[10px] py-[10px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
							value={confirmPassword}
							onChangeText={setConfirmPassword}
						/>
					</View>

					<View className="flex-row items-center w-[110%] justify-start gap-[5px]" style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}>
						<Switch
							trackColor={{ false: "#767577", true: "#f77c17" }}
							thumbColor={consentCookie ? "#fff" : "#fff"}
							ios_backgroundColor="#ccc"
							onValueChange={toggleSwitchCGU}
							value={acceptCGU}
						/>
						{/* dsqdqs */}
						<Text
							onPress={() => setStepView("cgu")}
							style={[{ textDecorationLine: "underline" }]}
							className="text-[14px] text-[#222] font-semibold"
						>
							Voir les conditions d'utilisation
						</Text>
					</View>

					<View className="flex-row items-center w-[110%] justify-start gap-[5px]" style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}>
						<Switch
							trackColor={{ false: "#767577", true: "#f77c17" }}
							thumbColor={consentCookie ? "#fff" : "#fff"}
							ios_backgroundColor="#ccc"
							onValueChange={toggleSwitchCookie}
							value={consentCookie}
						/>
						<Text className="text-[14px] text-[#222] font-semibold">Accepter les cookies</Text>
					</View>

					{/* A changer le onPress */}
					<TouchableOpacity
						className="bg-white py-[8px] px-[14px] rounded-full mt-[10px] w-[60%] border-[5px] border-[#F6CB9E] shadow-lg"
						onPress={handleSubmit}
					>
						<Text className="font-bold text-center">Continue</Text>
					</TouchableOpacity>
				</>
			)}

			{stepView === "cgu" && (
				<>
					<Text className="text-white font-bold text-[25px] shadow-xl">
						Conditions d'utilisations
					</Text>
					<Text className="py-[30px]">
						The king, seeing how much happier his subjects were, realized the
						error of his ways and repealed the joke tax.The king, seeing how
						much happier his subjects were, realized the error of his ways and
						repealed the joke tax.The king, seeing how much happier his subjects
						were, realized the error of his ways and repealed the joke tax.The
						king, seeing how much happier his subjects were, realized the error
						of his ways and repealed the joke tax.The king, seeing how much
						happier his subjects were, realized the error of his ways and
						repealed the joke tax.
					</Text>

					<TouchableOpacity
							className="bg-white py-[8px] px-[14px] rounded-full mt-[10px] w-[60%] border-[5px] border-[#F6CB9E] shadow-lg"

						onPress={() => {
							setStepView("form");
							setAcceptCGU(true);
						}}
					>
						<Text className="font-bold text-center">Accepter</Text>
					</TouchableOpacity>
					<TouchableOpacity
							className="bg-white py-[8px] px-[14px] rounded-full mt-[10px] w-[60%] border-[5px] border-[#F6CB9E] shadow-lg"

						onPress={() => {
							setStepView("form");
						}}
					>
						<Text className="font-bold text-center">
							Retour à l'inscription
						</Text>
					</TouchableOpacity>
				</>
			)}
		</>
	);
}
