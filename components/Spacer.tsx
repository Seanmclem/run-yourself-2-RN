import * as React from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

interface props {
    height?: number | string,
    width?: number | string,
    color?: string,
}

export const Spacer: React.FC<props> = ({ height, width, color }) => {
    return useMemo(
        () => {
            const styles = StyleSheet.create({
                container: {
                    height: height || 'auto',
                    width: width || 'auto',
                    backgroundColor: color || 'transparent',
                    alignSelf: width === '100%' ? 'stretch' : 'auto',
                },
            });

            return (
                <View style={styles.container}>
                </View>
            );
        }, [height, width, color]
    )

}


