import { Ionicons, FontAwesome5, FontAwesome, Feather } from '@expo/vector-icons';
import { Tabs } from "expo-router"
import { globalStyles } from '../../constants';

const TabsLayout = () => {
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
                    tabBarIcon: () => <FontAwesome5 name="user" size={22} color='white' />
                }}
            />
        </Tabs>
    )
}

export default TabsLayout