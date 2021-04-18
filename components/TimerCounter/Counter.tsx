import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { AppButton } from '../AppButton';

export const Counter = () => {
    return (
        <View style={styles.container}>
            <Text>
                I'm a counter
        </Text>
            <AppButton
                onPress={() => null}
                title="Start Timer"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#2d1584',
    }
});
