import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { getWindowHeight, getWindowWidth } from '../utils/responsiveDimensions.utils';

export default ({ navigation }) => {
    const { colorInfo } = useSelector(state => state.Theme);

    const widgetStyle = {
        width: getWindowWidth() - 100,
        height: getWindowHeight() * 0.45,
        borderWidth: 0.1,
        borderRadius: 5,
        backgroundColor: colorInfo.colors.secondaryBackgroundColor
    }

    return (
        <View style={widgetStyle}>

        </View>
    )
}
