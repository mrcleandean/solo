import { Stack } from "expo-router"

const ProfileLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='settings' />
            <Stack.Screen name='edit-profile-modal' options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Edit Profile'
            }} />
        </Stack>
    )
}

export default ProfileLayout;