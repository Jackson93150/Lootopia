import {
	Image,
	ImageBackground,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import LoginForm from "../components/forms/LoginForm";

export default function LoginScreen() {
	return (
		<ImageBackground
			source={require("../../../../assets/images/backgroundAuth.png")}
			resizeMode="cover"
		>
			<ScrollView contentContainerClassName="w-full h-full flex justify-center items-center">
				<View className="w-[90%] h-[70%] flex justify-center items-center p-5">
					<Image
						source={require("../../../../assets/images/Logo_lootopia.png")}
						className="absolute w-[160px] h-[160px] top-[-110px] z-10"
						resizeMode="contain"
					/>

					<Image
						source={require("../../../../assets/images/Shop-Card-Gems-Complete_2.png")}
						className="absolute w-[113%] z-0"
						resizeMode="contain"
					/>

					{/* Google */}
					<TouchableOpacity className="bg-white py-[10px] px-[20px] rounded-full w-[80%] mb-[10px] border-[5px] border-[#F6CB9E] shadow-lg" >
						<Text className="font-bold text-center">Sign in with Google</Text>
					</TouchableOpacity>

					{/* Apple */}
					<TouchableOpacity className="bg-white py-[10px] px-[20px] rounded-full w-[80%] mb-[10px] border-[5px] border-[#F6CB9E] shadow-lg" >
						<Text className="font-bold text-center">Sign in with Apple</Text>
					</TouchableOpacity>

					<Text className="my-[10px] text-white font-bold text-[20px] shadow-lg">Or</Text>

					<LoginForm />
				</View>

				<Image
					source={require("../../../../assets/images/coffre3.png")}
					className="absolute w-[200px] h-[200px] bottom-[10px] right-[10px] z-[5]"
					resizeMode="contain"
				/>
			</ScrollView>
		</ImageBackground>
	);
}
