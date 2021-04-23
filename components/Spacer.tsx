import * as React from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

interface props {
    height?: number,
    width?: number,
}

export const Spacer: React.FC<props> = ({ height, width }) => {
    return useMemo(
        () => {
            const styles = StyleSheet.create({
                container: {
                    height: height || 'auto',
                    width: width || 'auto',
                },
            });

            return (
                <View style={styles.container}>
                </View>
            );
        }, [height, width]
    )

}


