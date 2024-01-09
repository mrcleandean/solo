import { AntDesign } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet } from "react-native";
import { globalStyles } from "../../../constants";
import { Text } from "react-native";

const CapturedVideoContext = createContext<{
    capturedVideo: { uri: string } | undefined,
    setCapturedVideo: Dispatch<SetStateAction<{ uri: string } | undefined>>
} | undefined>(undefined);

export const useCapturedVideoContext = () => {
    const context = useContext(CapturedVideoContext);
    if (!context) {
        throw new Error('useCapturedContext must be used within a CapturedVideoContext');
    }
    return context;
}

const CreateLayout = () => {
    const [capturedVideo, setCapturedVideo] = useState<{ uri: string } | undefined>(undefined);
    const [keyboardAcitve, setKeyboardActive] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardWillShow', () => {
            setKeyboardActive(true);
        });
        const hideSub = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardActive(false);
        })
        return () => {
            showSub.remove();
            hideSub.remove()
        }
    }, []);
    const headerLeftPressed = () => {
        Keyboard.dismiss();
        router.back();
    }

    return (
        <CapturedVideoContext.Provider value={{ capturedVideo, setCapturedVideo }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" key="ass" />
                <Stack.Screen name="upload" options={{
                    headerShown: true,
                    headerShadowVisible: true,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerStyle: styles.headerStyle,
                    headerTitle: 'New Showcase',
                    headerRight: () => (
                        keyboardAcitve && (
                            <Pressable onPress={Keyboard.dismiss}>
                                <Text style={styles.headerRightText}>OK</Text>
                            </Pressable>
                        )
                    ),
                    headerLeft: () => (
                        <Pressable onPress={headerLeftPressed} style={styles.headerLeftPressable}>
                            <AntDesign name="left" size={25} color="black" style={styles.headerLeftSymbol} />
                        </Pressable>
                    )
                }} />
            </Stack>
        </CapturedVideoContext.Provider>
    )
}

const styles = StyleSheet.create({
    headerLeftPressable: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
    },
    headerLeftSymbol: {
        transform: [{ translateX: -2 }]
    },
    headerRightText: {
        color: globalStyles.anchorColor.color,
        fontWeight: 'bold',
        fontSize: 20
    },
    headerStyle: {
        backgroundColor: globalStyles.bodyColor.backgroundColor,
    },
    headerTitleStyle: {
        color: 'white'
    }
})

export default CreateLayout;