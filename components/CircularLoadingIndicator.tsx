import { Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Svg, Circle } from 'react-native-svg';
import { maximumVideoDurationSeconds } from "../constants/constants";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularLoadingIndicator = () => {
    const radius = 40;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = useRef(new Animated.Value(0)).current; // Animated value

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 100,
            duration: maximumVideoDurationSeconds * 1000, // 120 seconds
            useNativeDriver: true,
        }).start();
    }, [progress]);

    const strokeDashoffset = progress.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    });

    return (
        <Svg height="120" width="120" viewBox="0 0 120 120">
            <Circle
                cx="60"
                cy="60"
                r={radius}
                strokeWidth={strokeWidth}
                stroke="white"
                fill="none"
                strokeOpacity={0.75}
            />
            <AnimatedCircle
                cx="60"
                cy="60"
                r={radius}
                strokeWidth={strokeWidth}
                stroke="red"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
            />
        </Svg>
    );
};

export default CircularLoadingIndicator;