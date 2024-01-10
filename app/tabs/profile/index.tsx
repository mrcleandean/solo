import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather, FontAwesome, Fontisto, AntDesign } from '@expo/vector-icons';
import { globalStyles } from '../../../constants';
import { useUserContext } from '../../_layout';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = () => {
    const { userAuth, userDoc } = useUserContext();
    if (userAuth === 'initial') return;

    const [gridActive, setGridActive] = useState<'posts' | 'list' | 'tags'>('posts');
    const isUsersProfile = userAuth?.email == userDoc?.email;
    return (
        <View style={styles.parentWrapper}>
            <View style={styles.mainContent}>
                <View style={styles.userDisplayWrapper}>
                    <Image style={styles.profilePicture} source={userDoc?.profilePicture || undefined} />
                    <View style={styles.userInfoWrapper}>
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
                        {
                            !isUsersProfile && (
                                <View style={styles.messageButtonsWrapper}>
                                    <View style={styles.messageButton}>
                                        <Text>Message</Text>
                                    </View>
                                    <View style={styles.messageOtherButtons}>
                                        <FontAwesome name="user" size={17.5} />
                                    </View>
                                    <View style={styles.messageOtherButtons}>
                                        <FontAwesome name='angle-down' size={17.5} />
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </View>
                <View style={styles.bioWrapper}>
                    <Text style={styles.fullNameText}>{userDoc?.fullName || ''}</Text>
                    <Text style={styles.bioText}>{userDoc?.bio || 'akjsdhfkjahsdfkj'}</Text>
                    <View style={styles.editProfileWrapper}>
                        <Pressable style={styles.editProfileButton}>
                            <Text style={styles.editProfileText}>Edit Profile</Text>
                        </Pressable>
                        <Pressable style={styles.miscButton}>
                            <Feather name='at-sign' size={16.5} color="black" />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.contentWrapper}>
                    <View style={styles.contentTypeWrapper}>
                        <Pressable onPress={() => setGridActive('posts')}>
                            <Fontisto name="nav-icon-grid-a" size={24} color={gridActive === 'posts' ? globalStyles.anchorColor.color : 'white'} />
                        </Pressable>
                        <Pressable onPress={() => setGridActive('list')}>
                            <Feather name="list" size={34} color={gridActive === 'list' ? globalStyles.anchorColor.color : 'white'} />
                        </Pressable>
                        <Pressable onPress={() => setGridActive('tags')}>
                            <AntDesign name="tags" size={30} color={gridActive === 'tags' ? globalStyles.anchorColor.color : 'white'} />
                        </Pressable>
                    </View>
                    <ScrollView style={styles.postsWrapper}>

                    </ScrollView>
                </View>
            </View>
        </View >
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
        width: '100%'
    },
    userDisplayWrapper: {
        width: '100%',
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 22.5
    },
    userInfoWrapper: {
        width: '100%',
        flex: 1,
        display: 'flex'
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
        padding: 20,
        paddingTop: 0,
        paddingBottom: 15,
        display: 'flex',
        gap: 3
    },
    fullNameText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 15.75
    },
    bioText: {
        fontWeight: '400',
        color: 'white'
    },
    editProfileWrapper: {
        width: '100%',
        marginTop: 7.5,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    editProfileButton: {
        backgroundColor: 'white',
        width: '100%',
        flex: 1,
        padding: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7.5,
    },
    editProfileText: {
        color: 'black'
    },
    miscButton: {
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
        borderRadius: 7.5
    },
    messageButton: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5
    },
    messageOtherButtons: {
        backgroundColor: 'white',
        padding: 6,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 4,
    },
    messageButtonsWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    contentWrapper: {
        width: '100%',
        flex: 1,
        marginTop: 7.5
    },
    contentTypeWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 2,
    },
    postsWrapper: {
        width: '100%',
        marginTop: 15,
        flex: 1,
        backgroundColor: 'white'
    }
})

export default Profile