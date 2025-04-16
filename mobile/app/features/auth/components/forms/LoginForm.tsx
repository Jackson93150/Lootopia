import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email("Veuillez entrer une adresse email valide."),
	password: z
		.string()
		.min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: FormValues) => {
		Alert.alert("Succès", "Connexion réussie !");
		console.log(data);
	};

	const onError = () => {
		Alert.alert("Formulaire invalide", "Veuillez corriger les erreurs.");
	};

	return (
		<>
			<Controller
				control={control}
				name="email"
				render={({ field }) => (
					<View className="w-full mb-[15px]">
						<Text className="mb-[5px] font-semibold text-[#222]">Email</Text>
						<TextInput
							placeholder="Email"
							placeholderTextColor="#888"
							className="bg-[#F6F6F6] rounded-[10px] py-[10px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
							value={field.value}
							onChangeText={field.onChange}
						/>
						{errors.email && (
							<Text className="text-red-500 text-sm mt-1">
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
					<View className="w-full mb-[15px]">
						<Text className="mb-[5px] font-semibold text-[#222]">Password</Text>
						<TextInput
							placeholder="Password"
							placeholderTextColor="#888"
							secureTextEntry
							className="bg-[#F6F6F6] rounded-[10px] py-[10px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
							value={field.value}
							onChangeText={field.onChange}
						/>
						{errors.password && (
							<Text className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</Text>
						)}
						<Text className="mt-[5px] text-black text-[12px] text-right">
							Forgot your Password?
						</Text>
					</View>
				)}
			/>

			<TouchableOpacity
				onPress={handleSubmit(onSubmit, onError)}
				className="bg-white py-[8px] px-[14px] rounded-full mt-[10px] w-[60%] border-[5px] border-[#F6CB9E] shadow-lg self-center"
			>
				<Text className="font-bold text-center">Connexion</Text>
			</TouchableOpacity>

			<Text className="mt-[20px] font-semibold text-white text-center shadow-lg">
				No account yet ?
			</Text>

			<TouchableOpacity className="bg-white py-[8px] px-[14px] rounded-full mt-[10px] w-[60%] border-[5px] border-[#F6CB9E] shadow-lg self-center">
				<Text className="font-bold text-center">Create an account</Text>
			</TouchableOpacity>
		</>
	);
}
