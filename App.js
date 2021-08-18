import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Brightness from 'expo-brightness';

const setBrightness = async brightnessState => {
    const { status } = await Brightness.requestPermissionsAsync()
    if (status === 'granted') {
        if (brightnessState) {
            Brightness.useSystemBrightnessAsync()
        } else {
            Brightness.setBrightnessAsync(1)
        }
    }
}
export default function App() {
    const [presentBrightness, setPresentBrightness] = useState(false)
    useEffect(() => {
        (async () => {
            const { status } = await Brightness.requestPermissionsAsync()
            if (status === 'granted') {
                setPresentBrightness(true)
                Brightness.setBrightnessAsync(1)
            }
        })();
    }, [])
    return (
        <View style={styles.container} onStartShouldSetResponder={() => {
            setBrightness(presentBrightness)
            setPresentBrightness(!presentBrightness)
        }}>
            <Text>Vui lòng allow SYSTEM_BRIGHTNESS</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
