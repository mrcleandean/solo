import { Stack, useRouter } from "expo-router"
import { createContext, useEffect, useState } from "react"
import { FIREBASE_AUTH } from "../firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";

const UserContext = createContext<User | null>(null);

const RootLayout = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (user) router.replace('/(tabs)/home');
        else router.replace('/(auth)/login');
    }, [user]);

    return (
        <UserContext.Provider value={user}>
            <Stack screenOptions={{ headerShown: false }} />
        </UserContext.Provider>
    )
}

export default RootLayout