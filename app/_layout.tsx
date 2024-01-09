import { SplashScreen, Stack, useRouter } from "expo-router"
import { createContext, useContext, useEffect, useState } from "react"
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { hasMessageKey } from "../util";
import { doc, getDoc } from "firebase/firestore";

SplashScreen.preventAutoHideAsync();

type UserDocType = {
    email: string,
    username: string,
    fullName: string,
    profilePicture: string,
    notificationCount: number,
    followerCount: number,
    followingCount: number,
    postCount: number,
    bio: string
}

type UserContextType = {
    userAuth: User | null | 'initial',
    userDoc: UserDocType | null
} | null;

const UserContext = createContext<UserContextType>(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContext');
    }
    return context;
}



const RootLayout = () => {
    const [userAuth, setUserAuth] = useState<User | 'initial' | null>('initial');
    const [userDoc, setUserDoc] = useState<UserDocType | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUserAuth(user);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (userAuth === 'initial') return;
        setTimeout(() => {
            SplashScreen.hideAsync();
        }, 400);
        if (userAuth) {
            (async () => {
                try {
                    const userDocRef = doc(FIREBASE_DB, 'users', userAuth.uid);
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        setUserDoc(docSnap.data() as UserDocType);
                    } else throw new Error('User document does not exist');
                } catch (e) {
                    if (hasMessageKey(e)) console.log(e.message);
                }
            })();
            router.replace('/(tabs)/home');
            return;
        }

        router.replace('/(auth)/login');
    }, [userAuth]);

    return (
        <UserContext.Provider value={{ userAuth, userDoc }}>
            <Stack screenOptions={{ headerShown: false }} />
        </UserContext.Provider>
    )
}

export default RootLayout;