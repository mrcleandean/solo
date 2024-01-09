import { SplashScreen, Stack, useRouter } from "expo-router"
import { createContext, useEffect, useState } from "react"
import { FIREBASE_AUTH } from "../firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";

const UserContext = createContext<User | null | 'initial'>(null);

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [user, setUser] = useState<User | 'initial' | null>('initial');
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (user === 'initial') return;
        setTimeout(() => {
            SplashScreen.hideAsync();
        }, 400);
        if (user) {
            router.replace('/(tabs)/home');
            return;
        }

        router.replace('/(auth)/login');
    }, [user]);

    return (
        <UserContext.Provider value={user}>
            <Stack screenOptions={{ headerShown: false }} />
        </UserContext.Provider>
    )
}

export default RootLayout;