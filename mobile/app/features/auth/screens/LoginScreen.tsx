import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { styleScreen, styleImage, styleButton } from "../styles";

import LoginForm from "../components/LoginForm";

export default function LoginScreen() {
  return (
    <ImageBackground
      source={require("../../../../assets/images/backgroundAuth.png")}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styleScreen.scrollContainer}>
        <View style={styleScreen.card}>
          <Image
            source={require("../../../../assets/images/lootopiaLogo.png")}
            style={styleImage.logo}
            resizeMode="contain"
          />

          <Image
            source={require("../../../../assets/images/Shop-Card-Gems-Title.png")}
            style={styleImage.banner}
            resizeMode="contain"
          />

          {/* Google */}
          <TouchableOpacity style={styleButton.socialButton}>
            <Text style={styleButton.socialText}>Sign in with Google</Text>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity style={styleButton.socialButton}>
            <Text style={styleButton.socialText}>Sign in with Apple</Text>
          </TouchableOpacity>

          <Text style={styleScreen.or}>Or</Text>

          <LoginForm />
          
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
