import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { getResponsiveHeight } from "../utils/responsiveDimensions.utils";

const MButton = (props) => {
  const { colorInfo } = useSelector((state) => state.Theme);

  const buttonContainerStyle = {
    justifyContent: "center",
    alignItems: "center",
    ...props.buttonContainerStyle,
  };

  const buttonStyle = {
    backgroundColor: colorInfo.colors.buttonBackground,
    height: getResponsiveHeight(50, 80),
    borderRadius: 15,
    ...props.buttonStyle,
  };

  const buttonTextStyle = {
    fontSize: 16,
    color: colorInfo.colors.secondaryText,
    ...props.buttonTextStyle,
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Button
        containerStyle={buttonContainerStyle}
        buttonStyle={buttonStyle}
        titleStyle={buttonTextStyle}
        title={props.title}
        onPress={props.onPress}
        disabled={props.disabled}
        type={props.type ? props.type : "solid"}
      />
    </View>
  );
};

export default MButton;
