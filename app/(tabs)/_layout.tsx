import { Ionicons, FontAwesome5, FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { Tabs, router, usePathname } from "expo-router"
import { globalStyles } from '../../constants';
import { Pressable, StyleSheet } from 'react-native';
import { useUserContext } from '../_layout';

const TabsLayout = () => {
    const { userDoc } = useUserContext();
    const pathname = usePathname();
    const profileBackPressed = () => {
        if (pathname === '/profile/settings' && router.canGoBack()) router.back();
        else router.replace('/(tabs)/home')
    }
    const profileSettingsPressed = () => {
        router.push('/profile/settings');
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
                listeners={{
                    tabPress: () => {
                        if (pathname === '/home') return;
                        router.replace('/(tabs)/home');
                    }
                }}
            />
            <Tabs.Screen
                name="discover"
                options={{
                    tabBarIcon: () => <Feather name="search" size={24} color='white' />
                }}
                listeners={{
                    tabPress: () => {
                        if (pathname === '/discover') return;
                        router.replace('/(tabs)/discover');
                    }
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    tabBarIcon: () => <FontAwesome5 name="plus-square" size={24} color='white' />
                }}
                listeners={{
                    tabPress: () => {
                        if (pathname === '/create') return;
                        router.replace('/(tabs)/create');
                    }
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    tabBarIcon: () => <Ionicons name="md-chatbox-outline" size={24} color="white" />
                }}
                listeners={{
                    tabPress: () => {
                        if (pathname === '/inbox') return;
                        router.replace('/(tabs)/inbox');
                    }
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
                        <Pressable onPress={profileBackPressed} style={[styles.headerPressable, { marginLeft: headerSymbolMargin }]}>
                            <AntDesign name="left" size={25} color="white" style={styles.headerLeftSymbol} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable onPress={profileSettingsPressed} style={[styles.headerPressable, { marginRight: headerSymbolMargin }]}>
                            <FontAwesome name="gear" size={25} color="white" />
                        </Pressable>
                    ),
                    tabBarIcon: () => <FontAwesome5 name="user" size={22} color='white' />,
                }}
                listeners={{
                    tabPress: () => {
                        if (pathname === '/profile') return;
                        if (pathname === '/profile/settings' && router.canGoBack()) {
                            router.back();
                            return;
                        }
                        router.replace('/profile')
                    }
                }}
            />
        </Tabs>
    )
}

const headerSymbolMargin = 10;

const styles = StyleSheet.create({
    headerPressable: {
        width: 30,
        height: 30,
        borderRadius: 50,
        padding: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerLeftSymbol: {
        transform: [{ translateX: -1 }]
    },
})

export default TabsLayout