import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, linkWithPhoneNumber, updateProfile, RecaptchaVerifier } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { hasMessageKey } from "../../util";
import { globalStyles } from "../../constants";

const SignUp = () => {
    const soloLogo = require('../../assets/images/TypoGraphicaSolo.png');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const router = useRouter();
    const trySignUp = async () => {
        try {
            if (password !== passwordVerification) throw new Error('Passwords do not match');
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(`User ${username} created!`);
        } catch (e) {
            if (hasMessageKey(e)) console.log(`Sign up error: ${e.message}`);
        }
    }
    return (
        <View style={styles.parent}>
            <View style={[styles.section, { flex: 8 }]}>
                <Image source={soloLogo} style={{ transform: [{ scale: 0.4 }], marginBottom: -30 }} />
                <TextInput
                    onChangeText={text => setEmail(text)}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="#acadad"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={text => setUsername(text)}
                    value={username}
                    placeholder="Username"
                    placeholderTextColor="#acadad"
                    style={styles.input}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        onChangeText={text => setPassword(text)}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="#acadad"
                        style={styles.password}
                        secureTextEntry={!passwordShown}
                    />
                    <Feather name={passwordShown ? "eye" : "eye-off"} size={25} color="white" style={{
                        position: 'absolute',
                        right: 12.5
                    }} onPress={() => setPasswordShown(prev => !prev)} />
                </View>
                <TextInput
                    onChangeText={text => setPasswordVerification(text)}
                    value={passwordVerification}
                    placeholder="Confirm Password"
                    placeholderTextColor="#acadad"
                    style={styles.input}
                    secureTextEntry={!passwordShown}
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={trySignUp}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 15
                    }}>Create Account</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.section, {
                flex: 1,
                borderTopWidth: 2,
                borderColor: '#555455',
            }]}>
                <View style={styles.signUpWrapper}>
                    <Text style={{
                        color: '#9fa2a1',
                        fontSize: 15,
                    }}>Already have an account?</Text>
                    <Pressable onPress={() => {
                        router.replace('/(auth)/login');
                    }}>
                        <Text style={globalStyles.anchorColor}>Log in</Text>
                    </Pressable>
                </View>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#1a1919',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1
    },
    title: {
        color: 'white',
        fontSize: 30,
    },
    input: {
        color: 'white',
        padding: 15,
        fontSize: 17,
        width: '80%',
        backgroundColor: '#353535',
        borderRadius: 10
    },
    passwordContainer: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    password: {
        color: 'white',
        padding: 15,
        fontSize: 17,
        width: '100%',
        backgroundColor: '#353535',
        borderRadius: 10
    },
    loginButton: {
        width: '80%',
        backgroundColor: globalStyles.summission.backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15
    },
    googleButtonContainer: {
        backgroundColor: 'white',
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 15,
        marginTop: 10
    },
    googleText: {
        color: '#7a797a',
        fontSize: 15
    },
    orContainer: {
        width: '80%',
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    orBar: {
        height: 3,
        flex: 2,
        backgroundColor: '#555455'
    },
    signUpWrapper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: 20
    },
    section: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        flexDirection: 'column'
    }
})

export default SignUp