import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../../constants";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { useUserContext } from "../../../_layout";
import { hasMessageKey } from "../../../../util";

const DeleteAccountModal = () => {
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [optionalFeedback, setOptionalFeedback] = useState('');
    const { userAuth } = useUserContext();
    const maxFeedbackLength = 300;
    const setFeedback = (text: string) => {
        const lastChar = text[text.length - 1];
        if (lastChar === '\n') {
            Keyboard.dismiss();
            return;
        }
        setOptionalFeedback(text);
    }
    const tryDelete = async () => {
        try {
            if (userAuth === 'initial') throw new Error('App has not loaded yet');
            if (userAuth === null) throw new Error('User is not logged in');
            if (userAuth.email === null) throw new Error('User does not have an email');
            const credential = EmailAuthProvider.credential(userAuth.email, password);
            await reauthenticateWithCredential(userAuth, credential);
            await deleteUser(userAuth);
            console.log('Account deleted');
        } catch (e) {
            if (hasMessageKey(e)) console.log(e.message);
        }
    }
    return (
        <View style={styles.parentWrapper}>
            <Text style={styles.instructText}>Please enter your password to delete your account</Text>
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
            <Text style={styles.instructText}>Optional Feedback: Why are you leaving this platform?</Text>
            <View style={{ width: '100%' }}>
                <TextInput
                    onChangeText={text => setFeedback(text)}
                    value={optionalFeedback}
                    multiline={true}
                    maxLength={300}
                    placeholder="Feel free to let us know"
                    placeholderTextColor="#acadad"
                    style={styles.optionalFeedback}
                    secureTextEntry={!passwordShown}
                />
                <Text style={{
                    color: optionalFeedback.length >= maxFeedbackLength ? 'red' : 'white',
                    position: 'absolute',
                    right: 15,
                    bottom: 15,
                }}>{optionalFeedback.length}/{maxFeedbackLength}</Text>
            </View>
            <TouchableOpacity style={styles.warningButton} onPress={tryDelete}>
                <Text style={{
                    color: 'white'
                }}>
                    Confirm Deletion
                </Text>
                <AntDesign name="delete" size={22} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    parentWrapper: {
        backgroundColor: globalStyles.bodyColor.backgroundColor,
        width: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: 30
    },
    instructText: {
        color: 'white',
        fontSize: 16
    },
    passwordContainer: {
        width: '100%',
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
    optionalFeedback: {
        color: 'white',
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        fontSize: 17,
        height: 200,
        width: '100%',
        backgroundColor: '#353535',
        borderRadius: 10
    },
    warningButton: {
        backgroundColor: '#FF3131',
        padding: 12.5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    }
})

export default DeleteAccountModal;