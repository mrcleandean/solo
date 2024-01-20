import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../../../constants";
import { useState } from "react";
import { useUserContext } from "../../_layout";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { updateCurrentUser } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { hasMessageKey } from "../../../util";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { router } from "expo-router";

const DeleteAccountModal = () => {
    const { userAuth, userDoc } = useUserContext();

    if (userDoc === null) {
        return (
            <View style={[styles.parentWrapperNoUser, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.textLabel}>Unable to get user information</Text>
            </View>
        )
    };
    const [activeInput, setActiveInput] = useState<'username' | 'displayName' | 'bio' | null>(null);
    const [bioText, setBioText] = useState<string>(userDoc.bio);
    const [username, setUsername] = useState<string>(userDoc.username);
    const [displayName, setDisplayName] = useState<string>(userDoc.fullName);
    const maxBioLength = 250;
    const checkBioText = (text: string) => {
        const lastChar = text[text.length - 1];
        if (lastChar === '\n') {
            Keyboard.dismiss();
            return;
        }
        setBioText(text);
    }
    const updateProfile = async () => {
        if (userAuth === null || userAuth === 'initial') return;
        try {
            const userDocRef = doc(FIREBASE_DB, 'users', userAuth.uid);
            await updateDoc(userDocRef, {
                username,
                fullName: displayName,
                bio: bioText
            });
            router.back();
        } catch (e) {
            if (hasMessageKey(e)) console.log(e.message);
            else console.log('An error has occured at update profile');
        }
    }
    return (
        <KeyboardAvoidingView
            contentContainerStyle={styles.parentWrapperContentStyle}
            style={styles.parentWrapperRegularStyle}
            behavior="position"
            keyboardVerticalOffset={30}
            enabled={activeInput === 'bio'}
        >
            <View style={styles.subParent}>
                <Image style={styles.profilePicture} source={userDoc?.profilePicture || undefined} />
            </View>
            <Text style={styles.textLabel}>Username</Text>
            <TextInput
                placeholder="Username"
                placeholderTextColor="#acadad"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.text}
                onFocus={() => setActiveInput('username')}
            />
            <Text style={styles.textLabel}>Display Name</Text>
            <TextInput
                placeholder="Display Name"
                placeholderTextColor="#acadad"
                value={displayName}
                onChangeText={(text) => setDisplayName(text)}
                style={styles.text}
                onFocus={() => setActiveInput('displayName')}
            />
            <Text style={styles.textLabel}>Bio</Text>
            <View style={{ width: '100%' }}>
                <TextInput
                    multiline={true}
                    maxLength={maxBioLength}
                    placeholder="Write your bio here..."
                    placeholderTextColor="#acadad"
                    value={bioText}
                    onChangeText={text => checkBioText(text)}
                    style={styles.bioInput}
                    onPressIn={() => setActiveInput('bio')}
                />
                <Text style={{
                    color: bioText.length >= maxBioLength ? 'red' : 'white',
                    position: 'absolute',
                    right: 15,
                    bottom: 15,
                }}>{bioText.length}/{maxBioLength}</Text>
            </View>
            <View style={styles.subParent}>
                <TouchableOpacity style={styles.submissionButton} onPress={updateProfile}>
                    <Text style={{
                        color: 'white'
                    }}>
                        Update Profile
                    </Text>
                    <Feather name="edit-2" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    parentWrapperNoUser: {
        backgroundColor: globalStyles.bodyColor.backgroundColor,
        width: '100%',
        flex: 1,
        display: 'flex',
        gap: 10,
        padding: 30
    },
    parentWrapperContentStyle: {
        backgroundColor: globalStyles.bodyColor.backgroundColor,
        flex: 1,
        gap: 10,
        padding: 30
    },
    parentWrapperRegularStyle: {
        flex: 1,
        display: 'flex',
    },
    textLabel: {
        color: 'white',
        fontSize: 16,
        marginTop: 15
    },
    text: {
        color: 'white',
        padding: 15,
        fontSize: 17,
        width: '100%',
        backgroundColor: '#353535',
        borderRadius: 10
    },
    bioInput: {
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
    subParent: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 15
    },
    submissionButton: {
        backgroundColor: globalStyles.summission.backgroundColor,
        padding: 12.5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    },
    profilePicture: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 0.75
    },
})

export default DeleteAccountModal;