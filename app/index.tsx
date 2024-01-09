import { StyleSheet, View } from "react-native"
import { globalStyles } from "../constants";

const InitialLoading = () => {
    return (
        <View style={styles.container} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: globalStyles.bodyColor.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default InitialLoading;
