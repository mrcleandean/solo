import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image, ActivityIndicator, TextInput } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { hasMessageKey } from "../../util";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { globalStyles } from "../../constants";

const Login = () => {
    const soloLogo = require('../../assets/images/TypoGraphicaSolo.png');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loggingIn, setLoggingIn] = useState<boolean>(false);
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const router = useRouter();
    const tryLogin = async () => {
        try {
            setLoggingIn(true);
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, username, password);
            if (userCredential) {
                console.log('Log in successful');
                setLoggingIn(false);
            } else throw new Error('Could not find an account with those credentials.');
        } catch (e) {
            setLoggingIn(false);

            if (hasMessageKey(e)) console.log(`Log in error: ${e.message}`);
        }
    }
    return (
        <View style={styles.parent}>
            <View style={[styles.section, { flex: 9 }]}>
                <Image source={soloLogo} style={{ transform: [{ scale: 0.45 }] }} />
                <TextInput
                    onChangeText={text => setUsername(text)}
                    value={username}
                    placeholder="Username"
                    placeholderTextColor="#acadad"
                    autoCapitalize="none"
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
                <View style={{
                    width: '80%',
                    display: 'flex',
                    alignItems: 'flex-end',
                }}>
                    <Pressable>
                        <Text style={globalStyles.anchorColor}>
                            Forgotten Password?
                        </Text>
                    </Pressable>
                </View>

                <TouchableOpacity
                    style={[styles.loginButton, { opacity: loggingIn ? 0.8 : 1 }]}
                    disabled={loggingIn}
                    onPress={tryLogin}
                >
                    {
                        loggingIn ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <Text style={{
                                color: 'white',
                                fontSize: 16
                            }}>Log in</Text>
                        )
                    }
                </TouchableOpacity>
                <View style={styles.orContainer}>
                    <View style={styles.orBar} />
                    <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white' }}>Or</Text>
                    </View>
                    <View style={styles.orBar} />
                </View>
                <TouchableOpacity style={styles.googleButtonContainer}>
                    <AntDesign name="google" size={24} color="black" />
                    <Text style={styles.googleText}>Sign in with Google</Text>
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
                    }}>Don't have an account?</Text>
                    <Pressable onPress={() => {
                        router.replace('/auth/signup');
                    }}>
                        <Text style={globalStyles.anchorColor}>Sign Up</Text>
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
        flex: 9
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
        gap: 20,
        flexDirection: 'column'
    }
})

export default Login;
