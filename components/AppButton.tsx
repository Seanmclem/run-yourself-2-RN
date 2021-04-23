import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, ViewStyle } from "react-native";

interface props {
    onPress: any,
    title: string,
    styleSpread?: ViewStyle[]
}

export const AppButton: React.FC<props> = ({ onPress, title, styleSpread = [] }) => (
    <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.appButtonContainer, ...styleSpread]}
    >
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});