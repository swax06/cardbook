import React from 'react';
import { View } from 'react-native';

const EmptySpace = ({ space = '2%' }: { space?: string | number }) => {
    return (
        <View style={{ margin: space }}>
        </View>
    );
};

export default EmptySpace;