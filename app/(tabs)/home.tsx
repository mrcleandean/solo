import { useCallback, useEffect, useState } from 'react';
import { ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler'
import { type AVPlaybackSource } from 'expo-av';
import { usePathname } from 'expo-router';
import { Short } from '../../components';
import { globalStyles } from '../../constants';
import { ref } from 'firebase/storage';
import { FIREBASE_STORAGE } from '../../firebaseConfig';
import { getDownloadURL } from 'firebase/storage';

const Feed = () => {
    const pathname = usePathname();
    //gs://solo-services.appspot.com/videos/1704761266818
    //gs://solo-services.appspot.com/videos/1704761403242
    const v1Ref = ref(FIREBASE_STORAGE, 'videos/1704761266818');
    const v2Ref = ref(FIREBASE_STORAGE, 'videos/1704761403242');
    const [array, setArray] = useState<AVPlaybackSource[]>([]);

    const [viewableItemIndex, setViewableItemIndex] = useState<number | null>(null);
    const [tabActive, setTabActive] = useState(false);
    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            setViewableItemIndex(viewableItems[0].index);
        }
    }, []);

    useEffect(() => {
        setTabActive(pathname === '/home');
    }, [pathname]);

    useEffect(() => {
        getDownloadURL(v1Ref).then(url => {
            setArray([{ uri: url }]);
        });
    }, []);

    return (
        <FlatList
            data={array}
            windowSize={4}
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            removeClippedSubviews
            viewabilityConfig={{
                itemVisiblePercentThreshold: 0,
            }}
            renderItem={({ item, index }) => <Short item={item} play={index === viewableItemIndex} canPlay={tabActive} />}
            pagingEnabled
            keyExtractor={(_item, index) => index.toString()}
            decelerationRate={'fast'}
            onViewableItemsChanged={onViewableItemsChanged}
            style={globalStyles.bodyColor}
        />
    );
}

export default Feed