import { View, Text, StyleSheet, Pressable, Keyboard } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { globalStyles } from "../../constants"
import { Ionicons, Feather } from '@expo/vector-icons';
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { useEffect, useState } from "react"

const PopularItem = ({ item }: { item: string }) => {
    return (
        <View style={popItemStyles.wrapper}>
            <Feather name="arrow-up-right" size={15} color="black" />
            <Text style={popItemStyles.text}>{item}</Text>
        </View>
    )
}

const popItemStyles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        padding: 6,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 12.5,
    },
    text: {
        color: 'black',
        fontSize: 12
    }
})

const Discover = () => {
    const [keyboardAcitve, setKeyboardActive] = useState(false);
    const [popularItems, setPopularItems] = useState(['Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem',])
    useEffect(() => {
        const showsub = Keyboard.addListener('keyboardWillShow', () => {
            setKeyboardActive(true);
        });
        const hidesub = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardActive(false);
        })
        return () => {
            showsub.remove();
            hidesub.remove();
        }
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchWrapper}>
                <TextInput
                    placeholder={'Search'}
                    placeholderTextColor='black'
                    style={styles.searchBarInput} />
                <Pressable style={styles.cancelPressable} onPress={() => {
                    Keyboard.dismiss();
                    console.log('test')
                }}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
            </View>
            <View style={styles.popularItemsWrapper}>
                <ScrollView style={styles.hScrollWrapper} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {popularItems.map((item, index) => <PopularItem item={item} key={index} />)}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.bodyColor.backgroundColor,
        width: '100%',
        height: '100%'
    },
    searchWrapper: {
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
        paddingTop: 5,
        gap: 10,
        alignItems: 'center',
    },
    popularItemsWrapper: {
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5
    },
    hScrollWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    searchBarInput: {
        backgroundColor: 'white',
        width: '100%',
        flex: 1,
        padding: 6,
        paddingLeft: 15,
        borderRadius: 15,
        color: 'black',
    },
    searchBarIcon: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        top: 0
    },
    cancelPressable: {
        transform: [{ translateX: 30 }],
        backgroundColor: 'red'
    },
    cancelText: {
        color: 'white',
        fontSize: 15.25
    }
})

export default Discover