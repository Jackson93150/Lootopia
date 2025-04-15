import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Switch
  } from "react-native";

import { styleInput, styleButton, styleSwitch } from "../../styles/register";
import { useState } from "react";

export default function RegisterForm() {
    const [isConsentGiven, setIsConsentGiven] = useState(false);

    const toggleSwitch = () => setIsConsentGiven((prev) => !prev);

    return (
        <>
            <View style={styleInput.inputGroup}>
                <Text style={styleInput.label}>Email</Text>
                <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                style={styleInput.input}
                />
                <TextInput
                placeholder="Confirm you'r email"
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
                <TextInput
                    placeholder="Confirm you'r password"
                    placeholderTextColor="#888"
                    style={styleInput.input}
                />
            </View>

            <View style={styleSwitch.switch}>
                <Switch
                    trackColor={{ false: "#767577", true: "#000" }}
                    thumbColor={isConsentGiven ? "#fff" : "#fff"}
                    ios_backgroundColor="#ccc"
                    onValueChange={toggleSwitch}
                    value={isConsentGiven}
                />
                <Text style={styleSwitch.switchLabel}>Consent to cookies</Text>
            </View>

            <TouchableOpacity style={styleButton.createBtn}>
                <Text style={styleButton.createBtnText}>Continue</Text>
            </TouchableOpacity>
        </>
    )
}