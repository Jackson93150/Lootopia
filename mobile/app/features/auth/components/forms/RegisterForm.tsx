import {
	Alert,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { useState } from "react";
import {
	styleButton,
	styleInput,
	styleScreen,
	styleSwitch,
} from "../../styles/register";

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
					<Text style={styleScreen.titleRegister}>Inscription</Text>

					<View style={styleInput.inputGroup}>
						<Text style={styleInput.label}>Pseudo</Text>
						<TextInput
							placeholder="Pseudo"
							placeholderTextColor="#888"
							style={styleInput.input}
							value={pseudo}
							onChangeText={setPseudo}
						/>
					</View>

					<View style={styleInput.inputGroup}>
						<Text style={styleInput.label}>Email</Text>
						<TextInput
							placeholder="Email"
							placeholderTextColor="#888"
							style={styleInput.input}
							value={email}
							onChangeText={setEmail}
						/>
					</View>

					<View style={styleInput.inputGroup}>
						<Text style={styleInput.label}>Password</Text>
						<TextInput
							placeholder="Password"
							placeholderTextColor="#888"
							secureTextEntry
							style={styleInput.input}
							value={password}
							onChangeText={setPassword}
						/>
						<TextInput
							placeholder="Confirm you'r password"
							placeholderTextColor="#888"
							secureTextEntry
							style={styleInput.input}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
						/>
					</View>

					<View style={styleSwitch.switch}>
						<Switch
							trackColor={{ false: "#767577", true: "#f77c17" }}
							thumbColor={consentCookie ? "#fff" : "#fff"}
							ios_backgroundColor="#ccc"
							onValueChange={toggleSwitchCGU}
							value={acceptCGU}
						/>
						<Text
							onPress={() => setStepView("cgu")}
							style={[
								styleSwitch.switchLabel,
								{ textDecorationLine: "underline" },
							]}
						>
							Voir les conditions d'utilisation
						</Text>
					</View>

					<View style={styleSwitch.switch}>
						<Switch
							trackColor={{ false: "#767577", true: "#f77c17" }}
							thumbColor={consentCookie ? "#fff" : "#fff"}
							ios_backgroundColor="#ccc"
							onValueChange={toggleSwitchCookie}
							value={consentCookie}
						/>
						<Text style={styleSwitch.switchLabel}>Accepter les cookies</Text>
					</View>

					{/* A changer le onPress */}
					<TouchableOpacity
						style={styleButton.stepButton}
						onPress={handleSubmit}
					>
						<Text style={styleButton.stepButtonText}>Continue</Text>
					</TouchableOpacity>
				</>
			)}

			{stepView === "cgu" && (
				<>
					<Text style={styleScreen.titleRegister}>
						Conditions d'utilisations
					</Text>
					<Text style={styleScreen.textConditions}>
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
						style={styleButton.stepButton}
						onPress={() => {
							setStepView("form");
							setAcceptCGU(true);
						}}
					>
						<Text style={styleButton.stepButtonText}>Accepter</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styleButton.stepButton}
						onPress={() => {
							setStepView("form");
						}}
					>
						<Text style={styleButton.stepButtonText}>
							Retour à l'inscription
						</Text>
					</TouchableOpacity>
				</>
			)}
		</>
	);
}
