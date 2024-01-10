import { Feather, AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { signOut } from "firebase/auth";
import { hasMessageKey } from "../../../../util";
import { globalStyles } from "../../../../constants";
import { Link } from "expo-router";

const Settings = () => {
    const tryLogOut = async () => {
        try {
            await signOut(FIREBASE_AUTH);
            console.log('Sign out successful');
        } catch (e) {
            if (hasMessageKey(e)) console.log('Sign out error: ', e.message);
        }
    }
    return (
        <View style={styles.parentWrapper}>
            <Link href='/tabs/profile/settings/deactivate-account-modal'>
                <TouchableOpacity style={styles.warningButton}>
                    <Text style={{
                        color: 'white'
                    }}>
                        Deactivate
                    </Text>
                    <AntDesign name="delete" size={22} color="white" />
                </TouchableOpacity>
            </Link>
            <Link href='/tabs/profile/settings/delete-account-modal'>
                <TouchableOpacity style={styles.warningButton}>
                    <Text style={{
                        color: 'white'
                    }}>
                        Delete Account
                    </Text>
                    <AntDesign name="delete" size={22} color="white" />
                </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.warningButton} onPress={tryLogOut}>
                <Text style={{
                    color: 'white'
                }}>
                    Log Out
                </Text>
                <Feather name="log-out" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    parentWrapper: {
        backgroundColor: globalStyles.bodyColor.backgroundColor,
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    warningButton: {
        backgroundColor: '#FF3131',
        padding: 12.5,
        borderRadius: 10,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    }
})

export default Settings;