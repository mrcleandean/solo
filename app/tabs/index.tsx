import { useCallback, useEffect, useState } from 'react';
import { ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler'
import { usePathname } from 'expo-router';
import { Short } from '../../components';
import { globalStyles } from '../../constants';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import { hasMessageKey } from '../../util';

export type VideoDataType = {
    docId: string,
    caption: string,
    durationMillis: number,
    timestamp: Date,
    userId: string,
    videoUrl: string
};

const Feed = () => {
    const pathname = usePathname();
    const [array, setArray] = useState<VideoDataType[]>([]);

    const [viewableItemIndex, setViewableItemIndex] = useState<number | null>(null);
    const [tabActive, setTabActive] = useState(false);
    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            setViewableItemIndex(viewableItems[0].index);
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const collectionRef = collection(FIREBASE_DB, 'videos');
                const q = query(collectionRef, orderBy('timestamp', 'desc'), limit(7));
                const querySnapshot = await getDocs(q);
                const docs = querySnapshot.docs.map(doc => ({
                    docId: doc.id,
                    ...doc.data()
                }));
                setArray(docs as VideoDataType[]);
            } catch (e) {
                if (hasMessageKey(e)) console.log(e.message);
                else console.log('An unknown error occured: Failed to fetch videos');
            }
        })();
    }, []);

    useEffect(() => {
        setTabActive(pathname === '/tabs');
    }, [pathname]);

    useEffect(() => {
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