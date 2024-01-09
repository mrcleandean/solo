import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { hasMessageKey } from '../../util';
import { globalStyles } from '../../constants';

const Profile = () => {
    const tryLogOut = async () => {
        try {
            await signOut(FIREBASE_AUTH);
            console.log('Sign out successful');
        } catch (e) {
            if (hasMessageKey(e)) console.log('Sign out error: ', e.message);
        }
    }
    return (
        <SafeAreaView style={styles.parentWrapper}>
            <View style={styles.mainContent}>

            </View>
            <TouchableOpacity
                style={styles.logOutButton}
                onPress={tryLogOut}
            >
                <Text style={{
                    color: 'white'
                }}>
                    Log Out
                </Text>
                <Feather name="log-out" size={20} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    parentWrapper: {
        backgroundColor: globalStyles.bodyColor.backgroundColor,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mainContent: {
        flex: 1,
        width: '100%',
        marginBottom: 10,
    },
    logOutButton: {
        backgroundColor: '#FF3131',
        padding: 12.5,
        borderRadius: 10,
        marginBottom: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    }
})

export default Profile