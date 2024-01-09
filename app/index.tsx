import { StyleSheet, Text, View } from "react-native"

const InitialLoading = () => {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default InitialLoading;
