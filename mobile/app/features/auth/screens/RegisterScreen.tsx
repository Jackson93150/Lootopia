import {
    View,
    ImageBackground,
    Image,
    ScrollView,
    Text
} from "react-native";

import { styleScreen, styleImage } from "../styles/register";

import RegisterForm from "../components/forms/RegisterForm";

export default function RegisterScreen() {
return (
    <ImageBackground
        source={require("../../../../assets/images/backgroundAuth.png")}
        resizeMode="cover"
    >
    <ScrollView contentContainerStyle={styleScreen.scrollContainer}>
        <View style={styleScreen.card}>
            <Image
                source={require("../../../../assets/images/Logo_lootopia.png")}
                style={styleImage.logo}
                resizeMode="contain"
            />

            <Image
                source={require("../../../../assets/images/Shop-Card-Gems-Complete_2.png")}
                style={styleImage.banner}
                resizeMode="contain"
            />

            <Text style={styleScreen.titleRegister}>
                Register
            </Text>

            <RegisterForm />
        
        </View>

        <Image
            source={require("../../../../assets/images/coffre3.png")}
            style={styleImage.chest}
            resizeMode="contain"
        />
    </ScrollView>
    </ImageBackground>
);
}
