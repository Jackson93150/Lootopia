import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from "react-native";

import { styleInput, styleScreen, styleButton } from "../../styles/login";

export default function LoginForm() {
    return (
        <>
            <View style={styleInput.inputGroup}>
                <Text style={styleInput.label}>Email</Text>
                <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                style={styleInput.input}
                />
            </View>

            <View style={styleInput.inputGroup}>
                <Text style={styleInput.label}>Password</Text>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    style={styleInput.input}
                />
                <Text style={styleScreen.forgot}>Forgot your Password?</Text>
            </View>

            <Text style={styleScreen.noAccount}>No account yet ?</Text>

            <TouchableOpacity style={styleButton.createBtn}>
                <Text style={styleButton.createBtnText}>Create an account</Text>
            </TouchableOpacity>
        </>
    )
}