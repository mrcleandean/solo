import { View, StyleSheet, Text, KeyboardAvoidingView, Dimensions, Keyboard } from "react-native"
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useCapturedVideoContext } from './_layout';
import { globalStyles } from "../../../constants";
import { Video, ResizeMode } from "expo-av";
import { useRef, useState } from "react";
import { router } from "expo-router";
import { addObjectMetadata, convertLocalUriToBlob, hasMessageKey, uploadObject } from "../../../util";
import { useUserContext } from "../../_layout";

const Upload = () => {
    const videoRef = useRef<Video>(null);
    const { userAuth } = useUserContext();
    const { capturedVideo, setCapturedVideo } = useCapturedVideoContext();
    const [durationMillis, setDurationMillis] = useState(0);
    const [image, setImage] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const captionLengthLimit = 250;

    const restoreDefaults = () => {
        setCapturedVideo(undefined);
        setDurationMillis(0);
        setImage(null);
        setCaption('');
        router.replace('/tabs/create');
    }

    const generateThumbnail = async (capturedVideo: { uri: string }, position = 0) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(capturedVideo.uri, { time: Math.floor(position) * 1000 });
            setImage(uri);
        } catch (e) {
            console.warn(e);
        }
    };

    const shareVideo = async () => {
        Keyboard.dismiss();
        if (!image || !capturedVideo || userAuth === null || userAuth === 'initial') return;
        try {
            const imageBlob = await convertLocalUriToBlob(image);
            if (imageBlob instanceof TypeError) throw new Error('Could not convert image to blob');
            const videoBlob = await convertLocalUriToBlob(capturedVideo.uri);
            if (videoBlob instanceof TypeError) throw new Error('Could not convert video to blob');

            const imageUrl = await uploadObject(imageBlob, userAuth.uid);
            const videoUrl = await uploadObject(videoBlob, userAuth.uid);

            await addObjectMetadata(userAuth.uid, imageUrl, 'images');
            await addObjectMetadata(userAuth.uid, videoUrl, 'videos');

            restoreDefaults();
            router.replace('/tabs/profile');
        } catch (e) {
            if (hasMessageKey(e)) console.log(e.message);
            else console.log('Unknown error in share()');
        }
    }

    return (
        <KeyboardAvoidingView
            style={[styles.parentWrapper, {
                width: Dimensions.get('window').width,
            }]}
            contentContainerStyle={[styles.parentWrapper, {
                width: Dimensions.get('window').width,
            }]}
            behavior="position"
            keyboardVerticalOffset={globalStyles.tabBar.height}
        >
            <View style={[styles.videoWrapper, {
                width: Dimensions.get('window').width * 0.35,
                height: Dimensions.get('window').height * 0.3
            }]}>
                <Video
                    source={capturedVideo}
                    resizeMode={ResizeMode.COVER}
                    ref={videoRef}
                    progressUpdateIntervalMillis={10}
                    onLoad={(status) => {
                        if (capturedVideo === undefined) {
                            restoreDefaults();
                            router.replace('/tabs/create');
                            return;
                        }
                        generateThumbnail(capturedVideo, 0);
                        if (status.isLoaded && status.durationMillis) {
                            setDurationMillis(status.durationMillis)
                        }
                    }}
                    style={styles.video}
                >
                    <View style={styles.videoButtonWrapper}>
                        <TouchableOpacity style={styles.videoButton}>
                            <Text style={styles.videoButtonText}>Preview</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.videoButton}>
                            <Text style={styles.videoButtonText}>Thumbnail</Text>
                        </TouchableOpacity>
                    </View>
                </Video>
            </View>
            <View style={styles.captionInputWrapper}>
                <TextInput
                    multiline={true}
                    placeholder="Write a caption..."
                    placeholderTextColor="white"
                    style={styles.captionInput}
                    inputMode="text"
                    value={caption}
                    onChangeText={text => {
                        if (text[text.length - 1] !== '\n') {
                            setCaption(text);
                        }
                    }}
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Enter') {
                            Keyboard.dismiss();
                        }
                    }}
                    returnKeyType="done"
                    maxLength={captionLengthLimit}
                />
                <Text style={[styles.captionInputText, {
                    color: caption.length / captionLengthLimit >= 0.8 ? 'red' : caption.length / captionLengthLimit >= 0.65 ? 'orange' : 'white',
                }]}>{caption.length}/{captionLengthLimit}</Text>
            </View>
            <View style={styles.optionsWrapper}>
                <View style={styles.optionWrapper}>
                    <View style={styles.optionLeftWrapper}>
                        <AntDesign name="tags" size={30} color="white" />
                        <Text style={styles.optionText}>Tag People</Text>
                    </View>
                    <AntDesign name="right" size={23} color="white" />
                </View>
                <View style={styles.optionWrapper}>
                    <View style={styles.optionLeftWrapper}>
                        <MaterialCommunityIcons name="crowd" size={30} color="white" />
                        <Text style={styles.optionText}>Audience</Text>
                    </View>
                    <AntDesign name="right" size={23} color="white" />
                </View>
                <View style={styles.optionWrapper}>
                    <View style={styles.optionLeftWrapper}>
                        <Ionicons name="location-sharp" size={30} color="white" />
                        <Text style={styles.optionText}>Add Location</Text>
                    </View>
                    <AntDesign name="right" size={23} color="white" />
                </View>
                <View style={styles.optionWrapper}>
                    <View style={styles.optionLeftWrapper}>
                        <Ionicons name="settings" size={30} color="white" />
                        <Text style={styles.optionText}>Advanced Settings</Text>
                    </View>
                    <AntDesign name="right" size={23} color="white" />
                </View>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={[styles.submissionButton, { backgroundColor: 'white', width: Dimensions.get('window').width / 2 - 25 }]}>
                    <Text style={[styles.submissionText, { color: 'black' }]}>Save Draft</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={shareVideo} style={[styles.submissionButton, { backgroundColor: globalStyles.summission.backgroundColor, width: Dimensions.get('window').width / 2 - 25, }]}>
                    <Text style={[styles.submissionText, { color: 'white' }]}>Share</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    parentWrapper: {
        backgroundColor: globalStyles.bodyColor.backgroundColor,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 7.5,
        flex: 1,
        paddingTop: 20,
        boxSizing: 'border-box',
    },
    videoWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flex: 3.25,
    },
    captionInputWrapper: {
        width: '100%',
        flex: 1,
        borderBottomWidth: 0.35,
        borderColor: 'white',
        position: 'relative'
    },
    captionInput: {
        width: '100%',
        height: '100%',
        fontSize: 17,
        color: 'white',
        padding: 15,
        paddingTop: 15,
    },
    captionInputText: {
        position: 'absolute',
        top: -20,
        right: 20,
    },
    optionsWrapper: {
        width: '100%',
        flex: 2.25
    },
    buttonWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        flex: 1,
    },
    video: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 0.5
    },
    videoButtonWrapper: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: 15,
        zIndex: 1
    },
    videoButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        width: 82.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    videoButtonText: {
        fontSize: 14
    },
    optionWrapper: {
        height: 50,
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: 'white',
        display: 'flex',
        paddingLeft: 10,
        paddingRight: 10,
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    optionLeftWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    optionText: {
        color: 'white',
        fontSize: 16,
    },
    submissionButton: {
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        boxSizing: 'content-box'
    },
    submissionText: {
        fontSize: 15.5,
    }
})

export default Upload;