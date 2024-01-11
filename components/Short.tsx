import { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Video, ResizeMode, type AVPlaybackSource } from 'expo-av';
import { globalStyles } from '../constants';
import { VideoDataType } from '../app/tabs';

const Short = ({ item, play, canPlay }: { item: VideoDataType; play: boolean; canPlay: boolean; }) => {
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
            source={{ uri: item.videoUrl }}
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