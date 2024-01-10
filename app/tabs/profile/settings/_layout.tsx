import { Stack } from "expo-router";

const SettingsLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='deactivate-account-modal' options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Deactivate Account'
            }} />
            <Stack.Screen name='delete-account-modal' options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Delete Account'
            }} />
        </Stack>
    )
}

export default SettingsLayout;