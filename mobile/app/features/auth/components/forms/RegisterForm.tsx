import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	Alert,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { z } from "zod";

const formSchema = z
	.object({
		email: z.string().email("Veuillez entrer une adresse email valide."),
		username: z
			.string()
			.min(2, "Le pseudo doit contenir au moins 2 caractères."),
		password: z
			.string()
			.min(6, "Le mot de passe doit contenir au moins 6 caractères."),
		confirmPassword: z.string(),
		consentCookies: z.boolean(),
		consentTerms: z.boolean().refine((val) => val, {
			message: "Vous devez accepter les conditions d'utilisation.",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Les mots de passe ne correspondent pas.",
	});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
	const [stepView, setStepView] = useState<"form" | "cgu">("form");

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			consentCookies: false,
			consentTerms: false,
		},
	});

	const onSubmit = (data: FormValues) => {
		Alert.alert("Form error", "Succeees");
		// nextStep()
	};

	const onError = () => {
		Alert.alert("Form error", "Les champs sont incorrects, ou invalides.");
	};

	return (
		<>
			{stepView === "form" && (
				<>
					<Controller
						control={control}
						name="username"
						render={({ field }) => (
							<View className="w-full mb-[15px]">
								<Text className="mb-[5px] font-semibold text-[#222]">
									Pseudo
								</Text>
								<TextInput
									placeholder="Pseudo"
									placeholderTextColor="#888"
									className="bg-[#F6F6F6] rounded-[10px] py-[5px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
									value={field.value}
									onChangeText={field.onChange}
								/>
								{errors.username && (
									<Text className="text-red-600 mt-1">
										{errors.username.message}
									</Text>
								)}
							</View>
						)}
					/>

					<Controller
						control={control}
						name="email"
						render={({ field }) => (
							<View className="w-full mb-[15px]">
								<Text className="mb-[5px] font-semibold text-[#222]">
									Email
								</Text>
								<TextInput
									placeholder="Email"
									placeholderTextColor="#888"
									className="bg-[#F6F6F6] rounded-[10px] py-[5px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
									value={field.value}
									onChangeText={field.onChange}
								/>
								{errors.email && (
									<Text className="text-red-600 mt-1">
										{errors.email.message}
									</Text>
								)}
							</View>
						)}
					/>

					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<View className="w-full mb-[10px]">
								<Text className="mb-[5px] font-semibold text-[#222]">
									Mot de passe
								</Text>
								<TextInput
									placeholder="Mot de passe"
									placeholderTextColor="#888"
									secureTextEntry
									className="bg-[#F6F6F6] rounded-[10px] py-[5px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
									value={field.value}
									onChangeText={field.onChange}
								/>
							</View>
						)}
					/>

					<Controller
						control={control}
						name="confirmPassword"
						render={({ field }) => (
							<View className="w-full mb-[15px]">
								<TextInput
									placeholder="Confirmation"
									placeholderTextColor="#888"
									secureTextEntry
									className="bg-[#F6F6F6] rounded-[10px] py-[5px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
									value={field.value}
									onChangeText={field.onChange}
								/>
								{errors.confirmPassword && (
									<Text className="text-red-600 mt-1">
										{errors.confirmPassword.message}
									</Text>
								)}
							</View>
						)}
					/>

					<Controller
						control={control}
						name="consentTerms"
						render={({ field }) => (
							<View
								className="flex-row items-center w-[110%] justify-start gap-[5px]"
								style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
							>
								<Switch
									trackColor={{ false: "#767577", true: "#f77c17" }}
									thumbColor="#fff"
									ios_backgroundColor="#ccc"
									value={field.value}
									onValueChange={field.onChange}
								/>
								<Text
									onPress={() => setStepView("cgu")}
									style={{ textDecorationLine: "underline" }}
									className="text-[14px] text-[#222] font-semibold"
								>
									Voir les conditions d'utilisation
								</Text>
							</View>
						)}
					/>
					{errors.consentTerms && (
						<Text className="text-red-600 mt-1">
							{errors.consentTerms.message}
						</Text>
					)}

					<Controller
						control={control}
						name="consentCookies"
						render={({ field }) => (
							<View
								className="flex-row items-center w-[110%] justify-start gap-[5px]"
								style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
							>
								<Switch
									trackColor={{ false: "#767577", true: "#f77c17" }}
									thumbColor="#fff"
									ios_backgroundColor="#ccc"
									value={field.value}
									onValueChange={field.onChange}
								/>
								<Text className="text-[14px] text-[#222] font-semibold">
									Accepter les cookies
								</Text>
							</View>
						)}
					/>

					<TouchableOpacity
						className="bg-white py-[8px] px-[14px] rounded-full mt-[10px] w-[60%] border-[5px] border-[#F6CB9E] shadow-lg"
						onPress={handleSubmit(onSubmit, onError)}
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
							setValue("consentTerms", true);
						}}
					>
						<Text className="font-bold text-center">Accepter</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="bg-white py-[8px] px-[14px] rounded-full mt-[10px] w-[60%] border-[5px] border-[#F6CB9E] shadow-lg"
						onPress={() => setStepView("form")}
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
