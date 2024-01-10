import { Ionicons, FontAwesome5, FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { Tabs, router, usePathname } from "expo-router"
import { globalStyles } from '../../constants';
import { Pressable, StyleSheet } from 'react-native';
import { useUserContext } from '../_layout';

const TabsLayout = () => {
    const { userDoc } = useUserContext();
    const pathname = usePathname();
    const profileBackPressed = () => {
        if (pathname === '/tabs/profile/settings' && router.canGoBack()) router.back();
        else router.replace('/tabs')
    }
    const profileSettingsPressed = () => {
        router.push('/tabs/profile/settings');
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
                name="index"
                options={{
                    tabBarIcon: () => <FontAwesome name="film" size={23} color='white' />
                }}
                listeners={{
                    tabPress: () => {
                        if (pathname === '/tabs') return;
                        router.replace('/tabs');
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
                        if (pathname === '/tabs/discover') return;
                        router.replace('/tabs/discover');
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
                        if (pathname === '/tabs/create') return;
                        router.replace('/tabs/create');
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
                        if (pathname === '/tabs/inbox') return;
                        router.replace('/tabs/inbox');
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
                    headerRight: () => {
                        if (pathname === '/tabs/profile/settings') return;
                        return (
                            <Pressable onPress={profileSettingsPressed} style={[styles.headerPressable, { marginRight: headerSymbolMargin }]}>
                                <FontAwesome name="gear" size={25} color="white" />
                            </Pressable>
                        )
                    },
                    tabBarIcon: () => <FontAwesome5 name="user" size={22} color='white' />,
                }}
                listeners={{
                    tabPress: () => {
                        if (pathname === '/tabs/profile') return;
                        if (pathname === '/tabs/profile/settings' && router.canGoBack()) {
                            router.back();
                            return;
                        }
                        router.replace('/tabs/profile')
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