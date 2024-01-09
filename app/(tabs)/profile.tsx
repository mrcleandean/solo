import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { hasMessageKey } from '../../util';
import { globalStyles } from '../../constants';
import { useUserContext } from '../_layout';
import { Image } from 'expo-image';

const Profile = () => {
    const { userDoc } = useUserContext();

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
            <View style={styles.mainContent}>
                <View style={styles.userInfoWrapper}>
                    <Image style={styles.profilePicture} source={userDoc?.profilePicture || undefined} />
                    <View style={styles.countsWrapper}>
                        <View style={styles.countWrapper}>
                            <Text style={styles.count}>{userDoc?.postCount || 0}</Text>
                            <Text style={styles.countText}>Posts</Text>
                        </View>
                        <View style={styles.countWrapper}>
                            <Text style={styles.count}>{userDoc?.followerCount || 0}</Text>
                            <Text style={styles.countText}>Followers</Text>
                        </View>
                        <View style={styles.countWrapper}>
                            <Text style={styles.count}>{userDoc?.followingCount || 0}</Text>
                            <Text style={styles.countText}>Following</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bioWrapper}>
                    <Text style={styles.fullNameText}>{userDoc?.fullName || 0}</Text>
                    <Text style={styles.bioText}>{userDoc?.bio || 'akjsdhfkjahsdfkj'}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.logOutButton} onPress={tryLogOut}>
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
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mainContent: {
        flex: 1,
        width: '100%',
        marginBottom: 10,
    },
    userInfoWrapper: {
        width: '100%',
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5
    },
    profilePicture: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 0.75
    },
    countsWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    countWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    count: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16.75
    },
    countText: {
        color: 'white',
        fontSize: 15.5
    },
    bioWrapper: {
        backgroundColor: 'blue',
        padding: 20,
        paddingTop: 0,
        display: 'flex',
        gap: 5
    },
    fullNameText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 17
    },
    bioText: {
        color: 'white'
    },
    logOutButton: {
        backgroundColor: '#FF3131',
        padding: 12.5,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    }
})

export default Profile