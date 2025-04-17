import { Image, ImageBackground, ScrollView, Text, View } from "react-native";

import RegisterForm from "../components/forms/RegisterForm";

export default function RegisterScreen() {
	return (
		<ImageBackground
			source={require("../../../../assets/images/backgroundAuth.png")}
			resizeMode="cover"
		>
			<ScrollView contentContainerClassName="w-full h-full flex justify-center items-center">
				<View className="w-[90%] h-[70%] flex justify-center items-center p-5">
					<Image
						source={require("../../../../assets/images/Logo_lootopia.png")}
						className="absolute size-[160px] top-[-110px] z-10"
						resizeMode="contain"
					/>

					<Image
						source={require("../../../../assets/images/Shop-Card-Gems-Complete_2.png")}
						className="absolute w-[113%] z-0"
						resizeMode="contain"
					/>

					<RegisterForm />
				</View>

				<Image
					source={require("../../../../assets/images/coffre3.png")}
					className="absolute size-[190px] bottom-[10px] right-[5px] z-5"
					resizeMode="contain"
				/>
			</ScrollView>
		</ImageBackground>
	);
}
