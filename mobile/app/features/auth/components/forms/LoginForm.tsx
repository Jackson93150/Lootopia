import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginForm() {
	return (
		<>
			<View className="w-full mb-[15px]">
				<Text className="mb-[5px] font-semibold text-[#222]">Email</Text>
				<TextInput
					placeholder="Email"
					placeholderTextColor="#888"
					className="bg-[#F6F6F6] rounded-[10px] py-[10px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
					/>
			</View>

			<View className="w-full mb-[15px]">
				<Text className="mb-[5px] font-semibold text-[#222]">Password</Text>
				<TextInput
					placeholder="Password"
					placeholderTextColor="#888"
					secureTextEntry
					className="bg-[#F6F6F6] rounded-[10px] py-[10px] px-[15px] border-[5px] border-[#F6CB9E] shadow-xl"
					/>
				<Text className="mt-[5px] text-black text-[12px] text-right">Forgot your Password?</Text>
			</View>

			<Text className="mt-[10px] font-semibold text-white shadow-lg">No account yet ?</Text>

			<TouchableOpacity 							className="bg-white py-[8px] px-[14px] rounded-full mt-[10px] w-[60%] border-[5px] border-[#F6CB9E] shadow-lg"
			>
				<Text className="font-bold text-center">Create an account</Text>
			</TouchableOpacity>
		</>
	);
}
