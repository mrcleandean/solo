import { StyleSheet, Text, View } from "react-native"
import { globalStyles } from "../constants";
import { Link } from "expo-router";

const InitialLoading = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.brokeText}>Something broke...</Text>
            <Link style={styles.linkText} href="/(tabs)/home">Return Home</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: globalStyles.bodyColor.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    brokeText: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white'
    },
    linkText: {
        color: globalStyles.anchorColor.color,
        fontSize: 20
    }
})

export default InitialLoading;
