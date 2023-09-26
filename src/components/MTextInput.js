import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
import { useSelector } from "react-redux";
import { getResponsiveHeight } from "../utils/responsiveDimensions.utils";

const MTextInput = (props) => {
  const { colorInfo } = useSelector((state) => state.Theme);

  const containerStyle = {
    justifyContent: "center",
    alignItems: "center",
    ...props.containerStyle,
  };

  const inputContainerStyle = {
    height: getResponsiveHeight(50, 80),
    borderWidth: 1,
    borderColor: colorInfo.colors.inputTextBorder,
    paddingLeft: 10,
    borderRadius: 15,
    shadowColor: "#888",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    ...props.inputContainerStyle,
  };

  const labelStyle = {
    color: colorInfo.colors.primaryText,
    paddingBottom: 5,
    ...props.labelStyle,
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Input
        {...props}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        placeholder={props.placeholder}
        onChangeText={(text) => props.onChangeText(text)}
        label={props.label}
        labelStyle={labelStyle}
        value={props.value}
        containerStyle={containerStyle}
        inputContainerStyle={inputContainerStyle}
      />
    </View>
  );
};

export default MTextInput;
