import React from "react";
import { Text, TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";

TouchableHighlight.defaultProps = { activeOpacity: 0.5 };

const MText = (props) => {
  const { colorInfo } = useSelector((state) => state.Theme);

  const textStyle = {
    color: colorInfo.colors.primaryText,
    fontSize: 16,
    ...props.style,
  };

  return (
    <TouchableHighlight
      onPress={props.onPress}
      disabled={[null, undefined].includes(props.onPress)}
      underlayColor={colorInfo.colors.transparent}
      style={props.containerStyle}
    >
      <Text
        numberOfLines={props.numberOfLines ? props.numberOfLines : 0}
        ellipsizeMode={props.ellipsizeMode ? props.ellipsizeMode : undefined}
        allowFontScaling={false}
        style={textStyle}
      >
        {props.text}
      </Text>
    </TouchableHighlight>
  );
};

export default MText;
