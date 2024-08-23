import { useRef } from 'react';
import { Animated } from 'react-native';

const useAnimatedPress = (startColor: string, endColor: string, durationIn: number = 200, durationOut: number = 400) => {
    const backgroundColor = useRef(new Animated.Value(0)).current;

    const animateColorPressIn = () => {
        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: durationIn,
            useNativeDriver: false,
        }).start();
    }

    const animateColorPressOut = () => {
        Animated.timing(backgroundColor, {
            toValue: 0,
            duration: durationOut,
            useNativeDriver: false,
        }).start();
    }

    const backgroundColorInterpolated = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: [startColor, endColor],
    });

    return {
        backgroundColor: backgroundColorInterpolated,
        animateColorPressIn,
        animateColorPressOut,
    };
}

export default useAnimatedPress;
