import { MaterialCommunityIcons, Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Alert, Animated, Pressable } from "react-native"
import { Video, ResizeMode } from 'expo-av';
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { usePathname, router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useCapturedVideoContext } from './_layout';
import { maximumVideoDurationSeconds } from '../../../constants/constants';
import { CircularLoadingIndicator } from '../../../components';

const Record = () => {
    const pathname = usePathname();
    const cameraRef = useRef<Camera | null>(null);
    const videoRef = useRef<Video | null>(null);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const { capturedVideo, setCapturedVideo } = useCapturedVideoContext();
    const [type, setType] = useState(CameraType.back);
    const [isRecording, setIsRecording] = useState(false);
    const [previewProgress, setPreviewProgress] = useState(0);
    const [tabAcitve, setTabActive] = useState(false);
    const cameraReadyRef = useRef(false);

    useEffect(() => {
        setTabActive(pathname === '/create');
        if (pathname !== '/create') {
            setIsRecording(false);
            setPreviewProgress(0);
        }
    }, [pathname]);

    useEffect(() => {
        validatePermission();
    }, []);

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const validatePermission = async () => {
        if (!permission) return false;
        const permissionResponse = await requestPermission();
        if (permissionResponse.granted) return true;
        if (permissionResponse.canAskAgain === false) {
            Alert.alert('Permission Required', 'Please allow camera access in settings to continue', [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        Linking.openSettings();
                    }
                }
            ])
        }
        return false;
    }

    const startRecording = async () => {
        const permissionValidated = await validatePermission();
        if (!permissionValidated) return;
        if (cameraRef.current && cameraReadyRef.current) {
            setIsRecording(true);
            const video = await cameraRef.current.recordAsync({
                maxDuration: maximumVideoDurationSeconds
            });
            setCapturedVideo(video);
            setIsRecording(false);
        }
    }

    const endRecording = async () => {
        cameraRef.current?.stopRecording();
    }

    const exitVideoPreview = async () => {
        setCapturedVideo(undefined);
    }

    const pickVideo = async () => {

    };

    const nextPressed = async () => {
        router.push('/(tabs)/create/upload');
    }

    if (!tabAcitve) return null;

    return (
        <View style={styles.parentWrapper}>
            {
                capturedVideo ? (
                    <View style={styles.videoWrapper}>
                        <Video
                            ref={videoRef}
                            style={styles.camera}
                            source={capturedVideo}
                            resizeMode={ResizeMode.COVER}
                            isLooping
                            onReadyForDisplay={() => {
                                videoRef.current?.playAsync();
                            }}
                            progressUpdateIntervalMillis={10}
                            onPlaybackStatusUpdate={(status) => {
                                if ('positionMillis' in status && 'durationMillis' in status && status.durationMillis) {
                                    setPreviewProgress(status.positionMillis / status.durationMillis)
                                }
                            }}
                        />
                        <SafeAreaView style={styles.videoSafeArea}>
                            <View style={styles.exitWrapper}>
                                <TouchableOpacity style={styles.exitButton} onPress={exitVideoPreview}>
                                    <AntDesign size={32.5} color="#1a1919" style={styles.exitSymbol} name="left" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cameraBottomWrapper}>
                                <View style={[styles.playbackBar, { width: `${previewProgress * 100}%` }]} />
                                <View style={styles.cameraButtonsWrapper}>
                                    <TouchableOpacity style={styles.editButton}>
                                        <Text style={styles.editText}>Edit</Text>
                                        <Feather name="edit-2" size={19} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.nextButton} onPress={nextPressed}>
                                        <Text style={styles.nextText}>Next</Text>
                                        <MaterialIcons name="navigate-next" size={27.5} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </SafeAreaView>
                    </View>
                ) : (
                    <Camera style={styles.camera} type={type} ref={cameraRef} onCameraReady={() => {
                        cameraReadyRef.current = true;
                    }}>
                        <View style={styles.buttonWrapper}>
                            <Ionicons name="image-outline" size={45} color="white" onPress={pickVideo} />
                            {
                                isRecording ? (
                                    <Pressable onPress={endRecording}>
                                        <CircularLoadingIndicator />
                                        <View style={styles.recordStopSquare} />
                                    </Pressable>
                                ) : <MaterialCommunityIcons name="record-circle-outline" size={95} color="white" onPress={startRecording} />
                            }
                            <MaterialCommunityIcons name="camera-flip-outline" size={45} color="white" onPress={toggleCameraType} />
                        </View>
                    </Camera>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    parentWrapper: {
        backgroundColor: '#1a1919',
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    camera: {
        width: '100%',
        height: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    buttonWrapper: {
        width: '100%',
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 25
    },
    videoWrapper: {
        backgroundColor: '#1a1919',
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    videoSafeArea: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    exitWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    exitButton: {
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    exitSymbol: {
        transform: [{ translateX: -2 }]
    },
    cameraBottomWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 15,
        paddingRight: 10,
        paddingLeft: 10
    },
    playbackBar: {
        backgroundColor: 'white',
        borderRadius: 2,
        height: 5
    },
    cameraButtonsWrapper: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    editButton: {
        backgroundColor: 'white',
        width: 80,
        height: 37.5,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 50,
        gap: 5,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    editText: {
        fontSize: 15
    },
    nextText: {
        fontSize: 15
    },
    nextButton: {
        backgroundColor: 'white',
        width: 80,
        height: 37.5,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    recordStopSquare: {
        backgroundColor: 'white',
        width: 35,
        height: 35,
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: [{ translateX: 35 / 2 }, { translateY: -35 / 2 }],
        borderRadius: 5
    }
})

export default Record
