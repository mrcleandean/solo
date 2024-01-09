import { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Video, ResizeMode, type AVPlaybackSource } from 'expo-av';
import { globalStyles } from '../constants';

const Short = ({ item, play, canPlay }: { item: AVPlaybackSource; play: boolean; canPlay: boolean; }) => {
    const video = useRef<Video | null>(null);
    useEffect(() => {
        if (play && canPlay) {
            video.current?.playAsync();
        } else {
            video.current?.pauseAsync();
            video.current?.setPositionAsync(0);
        }
    }, [play, canPlay]);
    return (
        <Video
            ref={video}
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - globalStyles.tabBar.height,
            }}
            source={item}
            resizeMode={ResizeMode.COVER}
            isLooping
        />
    );
}

const styles = StyleSheet.create({
    videoContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - globalStyles.tabBar.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Short;