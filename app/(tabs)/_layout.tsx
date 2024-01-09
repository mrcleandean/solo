import { Ionicons, FontAwesome5, FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { Tabs } from "expo-router"
import { globalStyles } from '../../constants';
import { Pressable, StyleSheet } from 'react-native';
import { useUserContext } from '../_layout';

const TabsLayout = () => {
    const { userDoc } = useUserContext();
    const profileBackPressed = () => {

    }
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: globalStyles.bodyColor.backgroundColor,
                    height: globalStyles.tabBar.height
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: () => <FontAwesome name="film" size={23} color='white' />
                }}
            />
            <Tabs.Screen
                name="discover"
                options={{
                    tabBarIcon: () => <Feather name="search" size={24} color='white' />
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    tabBarIcon: () => <FontAwesome5 name="plus-square" size={24} color='white' />
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    tabBarIcon: () => <Ionicons name="md-chatbox-outline" size={24} color="white" />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: globalStyles.bodyColor.backgroundColor,
                        height: 100
                    },
                    headerTitleStyle: {
                        color: 'white',
                        fontSize: 20,
                        fontWeight: '700',
                    },
                    headerTitle: userDoc?.username || 'Unavailable',
                    headerLeft: () => (
                        <Pressable onPress={profileBackPressed} style={styles.headerLeftPressable}>
                            <AntDesign name="left" size={25} color="black" style={styles.headerLeftSymbol} />
                        </Pressable>
                    ),
                    tabBarIcon: () => <FontAwesome5 name="user" size={22} color='white' />
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    headerLeftPressable: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 1.5,
        marginLeft: 10
    },
    headerLeftSymbol: {
        transform: [{ translateX: -2 }]
    },
})

export default TabsLayout